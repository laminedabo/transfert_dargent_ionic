<?php

// src/DataPersister

namespace App\DataPersister;

use App\Entity\Transaction;
use App\Services\TransactionCode;
use App\Repository\ClientRepository;
use App\Repository\CompteRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\TransactionRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;

/**
 *
 */
class TransactionPersister implements ContextAwareDataPersisterInterface
{
    /**
     * @var EntityManagerInterface
     */
    private $_entityManager;

    /**
     * @param Request
     */
    private $_request;
    private $_transaction;
    private $_security;
    private $_compte_repo;
    private $_client_repo;
    private $_transact_repo;

    public function __construct(
        EntityManagerInterface $entityManager,
        RequestStack $request,
        TransactionCode $trans,
        Security $security,
        TransactionRepository $transact_repo,
        CompteRepository $compte_repo,
        ClientRepository $client_repo
    ) {
        $this->_entityManager = $entityManager;
        $this->_request = $request->getCurrentRequest();
        $this->_transaction = $trans;
        $this->_security = $security;
        $this->_compte_repo = $compte_repo;
        $this->_client_repo = $client_repo;
        $this->_transact_repo = $transact_repo;
    }


    /**
     * {@inheritdoc}
     */
    public function supports($data, array $context = []): bool
    {
        return $data instanceof Transaction;
    }

    /**
     * @param Transaction $data
     */
    public function persist($data, array $context = [])
    {

        // if it's a POST request
        /**
         * Depot
         */
        if ($this->_request->getMethod() === 'POST' && preg_match( '/depot/' , $this->_request->getPathInfo())) {
            $accountId = $this->_request->attributes->get('id');
            if (!$accountId || !$account = $this->_compte_repo->find($accountId)) {
                return new JsonResponse(['infos'=>'compte introuvable']);
            }
            if (($data->getMontant())>$account->getSolde()) {
                return new JsonResponse(['infos'=>'le solde du compte est insuffisant pour cette transaction']);
            }

            $data->setCompte($account);
            $account->setSolde($account->getSolde()-$data->getMontant());

            $partAgence = $this->_transaction->frais($data->getMontant())['frais'];
            $data->setFrais($this->_transaction->frais($data->getMontant())['frais']);
            $data->setPartSysteme($this->_transaction->frais($data->getMontant())['systeme']);
            $data->setPartEtat($this->_transaction->frais($data->getMontant())['etat']);
            $data->setPartDepot(($partAgence*10)/100);
            $data->setPartRetrait(($partAgence*20)/100);

            $user = $this->_security -> getUser();
            $data->setSender($user);

            if ($from = $this->_client_repo->findOneByIdCard($data->getSendFrom()->getIdCard())) {
                $data->setSendFrom($from);
            }
            if ($to = $this->_client_repo->findOneByIdCard($data->getSendTo()->getIdCard())) {
                $data->setSendTo($to);
            }
        }

        /**
         * Retrait
         */
        if (preg_match( '/retrait/' , $this->_request->getPathInfo())) {
            if (!$data = $this->_transact_repo->findOneByCode($this->_request->attributes->get('code'))) {
                return new JsonResponse(['infos'=>'Ce code est invalide']);
                // return new Response(
                //     'Ce code est invalide',
                //     Response::HTTP_NOT_FOUND,
                //     ['content-type' => 'text/plain']
                // );
            }
            if ($data->GetWithdrawer()!==null) {
                return new JsonResponse(['infos'=>'Cette transaction est déjà validée']);
            }
            $user = $this->_security -> getUser();
            $data->setWithdrawer($user);
            $data->setEtat('OK');
            $data->setRetiredAt(new \DateTime());
            if (!$this->_request->attributes->get('id') || !$compteRetrait = $this->_transact_repo->find($this->_request->attributes->get('id'))) {
                return new JsonResponse(['infos'=>'compte introuvable']);
            }
            if (($data->getMontant())>$compteRetrait->getSolde()) {
                return new JsonResponse(['infos'=>'le solde du compte est insuffisant pour cette transaction']);
            }
            
            $compteRetrait->setSolde($compteRetrait->getSolde()-$data->getMontant());
            $data->setCompteRetrait($compteRetrait);
        }
        
        dd($data);
        $this->_entityManager->persist($data);
        $this->_entityManager->flush();
        return $data;
    }

    /**
     * {@inheritdoc}
     */
    public function remove($data, array $context = [])
    {
        $this->_entityManager->remove($data);
        $this->_entityManager->flush();
    }
}