<?php 

namespace App\DataProvider;

use App\Entity\Transaction;
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
    public function __construct(
        RequestStack $request,
        TransactionRepository $transact_repo
    ){
        $this->_request = $request->getCurrentRequest();
        $this->_transact_repo = $transact_repo;
    }


    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return Transaction::class === $resourceClass;
    }

    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = []): ?Transaction
    {
        dd('rr');
        // Retrieve the blog post item from somewhere then return it or null if not found
        $tr = $this->_transact_repo->find($this->_request->attributes->get('id'));
        // dd($tr);
        return $tr;
        // return new Transaction($id);
    }

    public function getCollection(string $resourceClass, string $operationName = null, array $context = []): iterable
    {
        // Retrieve the blog post collection from somewhere
        dd($operationName);
        if($operationName==='getByCode'){
            if (!$tr = $this->_transact_repo->findOneByCode($this->_request->attributes->get('code'))) {
                yield new JsonResponse(['infos'=>'code invalide ou introuvable']);
            }
            
        }
        yield $tr;


        // yield new Transaction(2);
    }
}