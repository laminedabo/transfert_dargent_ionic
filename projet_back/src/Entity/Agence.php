<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\AgenceRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      attributes={
 *          "denormalization_context"={"groups"={"agence_write"},"enable_max_depth"=true}
 *      }
 * )
 * @ORM\Entity(repositoryClass=AgenceRepository::class)
 */
class Agence
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
     * @Assert\NotBlank(message="agence address is required")
     * @Groups({"compte_details"})
     * @Groups({"agence_write"})
     */
    private $adresse;

    /**
     * @ORM\Column(type="string", length=255)
     * @ORM\Column(type="string", length=255)
     * @Assert\Regex(
     *     pattern="/((\+221|00221)?)((7[7608][0-9]{7}$)|(3[03][98][0-9]{6}$))/",
     *     match=true,
     *     message="Invalid phone number(Ex. 771234567)"
     * )
     * @Assert\NotBlank(message="agence number is required")
     * @Groups({"compte_details"})
     * @Groups({"agence_write"})
     */
    private $telephone;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"compte_details"})
     */
    private $lattitude;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"compte_details"})
     */
    private $longitude;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     * @Groups({"compte_details"})
     */
    private $statut="actif";

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="agences", cascade={"persist"})
     * @Assert\NotBlank(message="error. choose or create an admin")
     * @Groups({"agence_write"})
     */
    private $admins;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="agence", cascade={"persist"})
     */
    private $utilisateurs;

    /**
     * @ORM\OneToMany(targetEntity=Compte::class, mappedBy="agence", orphanRemoval=true, cascade={"persist"})
     * @Groups({"agence_write"})
     */
    private $comptes;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"compte_details"})
     * @Groups({"agence_write"})
     */
    private $nom;

    public function __construct()
    {
        $this->admins = new ArrayCollection();
        $this->utilisateurs = new ArrayCollection();
        $this->comptes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(string $telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getLattitude(): ?float
    {
        return $this->lattitude;
    }

    public function setLattitude(?float $lattitude): self
    {
        $this->lattitude = $lattitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): self
    {
        $this->longitude = $longitude;

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

    /**
     * @return Collection|User[]
     */
    public function getAdmins(): Collection
    {
        return $this->admins;
    }

    public function addAdmin(User $admin): self
    {
        if (!$this->admins->contains($admin)) {
            $this->admins[] = $admin;
        }

        return $this;
    }

    public function removeAdmin(User $admin): self
    {
        $this->admins->removeElement($admin);

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUtilisateurs(): Collection
    {
        return $this->utilisateurs;
    }

    public function addUtilisateur(User $utilisateur): self
    {
        if (!$this->utilisateurs->contains($utilisateur)) {
            $this->utilisateurs[] = $utilisateur;
            $utilisateur->setAgence($this);
        }

        return $this;
    }

    public function removeUtilisateur(User $utilisateur): self
    {
        if ($this->utilisateurs->removeElement($utilisateur)) {
            // set the owning side to null (unless already changed)
            if ($utilisateur->getAgence() === $this) {
                $utilisateur->setAgence(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Compte[]
     */
    public function getComptes(): Collection
    {
        return $this->comptes;
    }

    public function addCompte(Compte $compte): self
    {
        if (!$this->comptes->contains($compte)) {
            $this->comptes[] = $compte;
            $compte->setAgence($this);
        }

        return $this;
    }

    public function removeCompte(Compte $compte): self
    {
        if ($this->comptes->removeElement($compte)) {
            // set the owning side to null (unless already changed)
            if ($compte->getAgence() === $this) {
                $compte->setAgence(null);
            }
        }

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(?string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    // public function __toString(): string{
    //     return $this->nom.' '.$this->adresse;
    // }
}
