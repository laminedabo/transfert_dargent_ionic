<?php

namespace App\Entity;

use App\Repository\TransactionRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TransactionRepository::class)
 */
class Transaction
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $code;

    /**
     * @ORM\Column(type="float")
     */
    private $montant;

    /**
     * @ORM\Column(type="datetime")
     */
    private $sendAt;

    /**
     * @ORM\Column(type="datetime")
     */
    private $retiredAt;

    /**
     * @ORM\Column(type="float")
     */
    private $frais;

    /**
     * @ORM\Column(type="float")
     */
    private $partDepot;

    /**
     * @ORM\Column(type="float")
     */
    private $partRetrait;

    /**
     * @ORM\Column(type="float")
     */
    private $partEtat;

    /**
     * @ORM\Column(type="float")
     */
    private $partSysteme;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $etat="not completed";

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $senderName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $senderLastName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $senderNumber;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $senderIdCard;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $receiverName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $receiverLastName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $receiverNumber;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $receiverIdCard;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="transactions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $sender;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="transactions")
     */
    private $withdrawer;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getMontant(): ?int
    {
        return $this->montant;
    }

    public function setMontant(int $montant): self
    {
        $this->montant = $montant;

        return $this;
    }

    public function getSendAt(): ?\DateTimeInterface
    {
        return $this->sendAt;
    }

    public function setSendAt(\DateTimeInterface $sendAt): self
    {
        $this->sendAt = $sendAt;

        return $this;
    }

    public function getRetiredAt(): ?\DateTimeInterface
    {
        return $this->retiredAt;
    }

    public function setRetiredAt(\DateTimeInterface $retiredAt): self
    {
        $this->retiredAt = $retiredAt;

        return $this;
    }

    public function getFrais(): ?float
    {
        return $this->frais;
    }

    public function setFrais(float $frais): self
    {
        $this->frais = $frais;

        return $this;
    }

    public function getPartDepot(): ?float
    {
        return $this->partDepot;
    }

    public function setPartDepot(float $partDepot): self
    {
        $this->partDepot = $partDepot;

        return $this;
    }

    public function getPartRetrait(): ?float
    {
        return $this->partRetrait;
    }

    public function setPartRetrait(float $partRetrait): self
    {
        $this->partRetrait = $partRetrait;

        return $this;
    }

    public function getPartEtat(): ?float
    {
        return $this->partEtat;
    }

    public function setPartEtat(float $partEtat): self
    {
        $this->partEtat = $partEtat;

        return $this;
    }

    public function getPartSysteme(): ?float
    {
        return $this->partSysteme;
    }

    public function setPartSysteme(float $partSysteme): self
    {
        $this->partSysteme = $partSysteme;

        return $this;
    }

    public function getEtat(): ?string
    {
        return $this->etat;
    }

    public function setEtat(string $etat): self
    {
        $this->etat = $etat;

        return $this;
    }

    public function getSenderName(): ?string
    {
        return $this->senderName;
    }

    public function setSenderName(?string $senderName): self
    {
        $this->senderName = $senderName;

        return $this;
    }

    public function getSenderLastName(): ?string
    {
        return $this->senderLastName;
    }

    public function setSenderLastName(?string $senderLastName): self
    {
        $this->senderLastName = $senderLastName;

        return $this;
    }

    public function getSenderNumber(): ?string
    {
        return $this->senderNumber;
    }

    public function setSenderNumber(string $senderNumber): self
    {
        $this->senderNumber = $senderNumber;

        return $this;
    }

    public function getSenderIdCard(): ?string
    {
        return $this->senderIdCard;
    }

    public function setSenderIdCard(string $senderIdCard): self
    {
        $this->senderIdCard = $senderIdCard;

        return $this;
    }

    public function getReceiverName(): ?string
    {
        return $this->receiverName;
    }

    public function setReceiverName(string $receiverName): self
    {
        $this->receiverName = $receiverName;

        return $this;
    }

    public function getReceiverLastName(): ?string
    {
        return $this->receiverLastName;
    }

    public function setReceiverLastName(?string $receiverLastName): self
    {
        $this->receiverLastName = $receiverLastName;

        return $this;
    }

    public function getReceiverNumber(): ?string
    {
        return $this->receiverNumber;
    }

    public function setReceiverNumber(string $receiverNumber): self
    {
        $this->receiverNumber = $receiverNumber;

        return $this;
    }

    public function getReceiverIdCard(): ?string
    {
        return $this->receiverIdCard;
    }

    public function setReceiverIdCard(string $receiverIdCard): self
    {
        $this->receiverIdCard = $receiverIdCard;

        return $this;
    }

    public function getSender(): ?User
    {
        return $this->sender;
    }

    public function setSender(?User $sender): self
    {
        $this->sender = $sender;

        return $this;
    }

    public function getWithdrawer(): ?User
    {
        return $this->withdrawer;
    }

    public function setWithdrawer(?User $withdrawer): self
    {
        $this->withdrawer = $withdrawer;

        return $this;
    }
}
