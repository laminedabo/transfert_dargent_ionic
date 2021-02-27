<?php 

namespace App\DataProvider;

use App\Entity\Transaction;
use App\Services\TransactionCode;
use App\Repository\UserRepository;
use App\Repository\ClientRepository;
use App\Repository\TransactionRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use ApiPlatform\Core\DataProvider\ContextAwareCollectionDataProviderInterface;

final class TransactionProvider implements ItemDataProviderInterface,ContextAwareCollectionDataProviderInterface, RestrictedDataProviderInterface
{
    private $_request;
    private $_transact_repo;
    private $_transaction;
    private $_client_repo;
    private $_user_repo;

    public function __construct(
        RequestStack $request,
        TransactionRepository $transact_repo,
        TransactionCode $trans,
        ClientRepository $client_repo,
        UserRepository $user_repo
    ){
        $this->_request = $request->getCurrentRequest();
        $this->_transact_repo = $transact_repo;
        $this->_transaction = $trans;
        $this->_client_repo = $client_repo;
        $this->_user_repo = $user_repo;
    }


    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return Transaction::class === $resourceClass;
    }

    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = []): ?Transaction
    {
        // Retrieve the blog post item from somewhere then return it or null if not found
        return $this->_transact_repo->find($this->_request->attributes->get('id'));

        // return new Transaction($id);
    }

    public function getCollection(string $resourceClass, string $operationName = null, array $context = []): iterable
    {
        // Retrieve the blog post collection from somewhere
        if($operationName==='getByCode'){
            if (!$tr = $this->_transact_repo->findOneByCode($this->_request->attributes->get('code'))) {
                yield 'infos'=>'code invalide ou introuvable';
            }
            yield $tr;
        }
        
        if ($operationName==="admin_compte_transactions" || $operationName==="user_compte_transactions") {
            $idUser = $this->_request->attributes->get('id');
            $idCmpte = $this->_request->attributes->get('idc');
            $trans = $this->_transact_repo->findByUserAndCompte($idUser, $idCmpte);
            yield $trans;
        }

        if($operationName==='calcul_frais'){
            $frais=null;
            $montant = $idUser = $this->_request->attributes->get('montant');
            if (is_numeric($montant)) {
                $frais = $this->_transaction->frais($montant)['frais'];
            }
            yield 'frais'=>$frais;
        }

        if($operationName==='user_agence_compte'){
            $compte = null;
            if ($this->_user_repo->find($this->_request->attributes->get('id'))!==null && $this->_user_repo->find($this->_request->attributes->get('id'))->getAgence()!==null) {
                $compte = $this->_user_repo->find($this->_request->attributes->get('id'))->getAgence()->getComptes()[0];
            }
            yield $compte;
        }

        if($operationName==='user_client_nci'){
            yield $this->_client_repo->findOneByIdCard($this->_request->attributes->get('nci'));
        }
        // yield new Transaction(2);
    }
}