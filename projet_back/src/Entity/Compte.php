<?php

namespace App\Entity;

use App\Entity\Agence;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\CompteRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      attributes={
 *          "normalization_context"={"enable_max_depth"=true}
 *      },
 *      collectionOperations={
 *         "get"={
 *              "security"="is_granted('ROLE_ADMINSYSTEME')", 
 *              "security_message"="permission denied.",
 *              "path"="/admin/comptes",
 *          }
 *      },
 *      itemOperations={
 *          "patch"={
 *              "path"="/admin/comptes/{id}",
 *              "requirements"={"id"="\d+"},
 *              "security"="is_granted('ROLE_ADMINSYSTEME')", 
 *              "security_message"="permission denied.",
 *         },
 *          "get"={
 *              "path"="/admin/comptes/{id}",
 *              "requirements"={"id"="\d+"},
 *              "normalization_context"={"groups"={"compte_details"},"enable_max_depth"=true},
 *              "security"="is_granted('ROLE_ADMINSYSTEME')", 
 *              "security_message"="permission denied.",
 *          },
 *      }
 * )
 * @ORM\Entity(repositoryClass=CompteRepository::class)
 */
class Compte
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"compte_details"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"compte_details"})
     * @Assert\NotBlank(message="account number is required")
     */
    private $numero;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"compte_details"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="sold is required")
     *  @Assert\Range(
     *      min = 700000,
     *      minMessage="initial sold must be at least 700.000CFA"
     * )
     * @Groups({"compte_details"})
     */
    private $solde;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     * @Groups({"compte_details"})
     */
    private $statut="actif";

    /**
     * @ORM\ManyToOne(targetEntity=Agence::class, inversedBy="comptes", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="agence is required")
     * @Groups({"compte_details"})
     */
    private $agence;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="compte")
     * @Groups({"compte_details"})
     */
    private $transactions;

    public function __construct(){
        $this->createdAt = new \DateTime();
        $this->numero = substr(str_shuffle(str_repeat($x='0123456789ABC', ceil(6/strlen($x)) )),1,6);
        $this->transactions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumero(): ?string
    {
        return $this->numero;
    }

    public function setNumero(string $numero): self
    {
        $this->numero = $numero;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getSolde(): ?string
    {
        return $this->solde;
    }

    public function setSolde(string $solde): self
    {
        $this->solde = $solde;

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(?string $statut): self
    {
        $this->statut = $statut;

        return $this;
    }

    public function getAgence(): ?Agence
    {
        return $this->agence;
    }

    public function setAgence(?Agence $agence): self
    {
        $this->agence = $agence;

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getTransactions(): Collection
    {
        return $this->transactions;
    }

    public function addTransaction(Transaction $transaction): self
    {
        if (!$this->transactions->contains($transaction)) {
            $this->transactions[] = $transaction;
            $transaction->setCompte($this);
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction): self
    {
        if ($this->transactions->removeElement($transaction)) {
            // set the owning side to null (unless already changed)
            if ($transaction->getCompte() === $this) {
                $transaction->setCompte(null);
            }
        }

        return $this;
    }
}
