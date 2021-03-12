<?php

namespace  App\EventListener;

use App\Repository\CompteRepository;
use Symfony\Component\Security\Core\Exception\LockedException;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;


class LoginListener{

    private $compte_repo;

    public function __construct(CompteRepository $compte_repo){
        $this -> compte_repo = $compte_repo;
    }
    
    public function onSecurityAuthenticationSuccess(AuthenticationSuccessEvent $event){ 
        $data = $event->getData();
        $user = $event->getUser();
        if(\method_exists($user, 'GetEtat') && $user->getEtat()!=='actif'){
            throw new LockedException();
        }    

        $account = $this->compte_repo->findUserAccount($user->getId());
        $data['userId'] = $user->getId();
        $data['accountId'] = $account->getId();
        $data['telephone'] = $user->getTelephone();
        $data['role'] = $user->getRoles()[0];

        $event->setData($data);
    }
}