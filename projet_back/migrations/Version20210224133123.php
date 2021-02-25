<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210224133123 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE agence (id INT AUTO_INCREMENT NOT NULL, adresse VARCHAR(255) NOT NULL, telephone VARCHAR(255) NOT NULL, lattitude DOUBLE PRECISION DEFAULT NULL, longitude DOUBLE PRECISION DEFAULT NULL, statut VARCHAR(30) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE compte (id INT AUTO_INCREMENT NOT NULL, numero VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT NULL, solde VARCHAR(255) NOT NULL, statut VARCHAR(30) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE transaction (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(255) NOT NULL, montant DOUBLE PRECISION NOT NULL, send_at DATETIME NOT NULL, retired_at DATETIME NOT NULL, frais DOUBLE PRECISION NOT NULL, part_depot DOUBLE PRECISION NOT NULL, part_retrait DOUBLE PRECISION NOT NULL, part_etat DOUBLE PRECISION NOT NULL, part_systeme DOUBLE PRECISION NOT NULL, etat VARCHAR(100) NOT NULL, sender_name VARCHAR(255) NOT NULL, sender_last_name VARCHAR(255) DEFAULT NULL, sender_number VARCHAR(255) NOT NULL, sender_id_card VARCHAR(255) NOT NULL, receiver_name VARCHAR(255) NOT NULL, receiver_last_name VARCHAR(255) DEFAULT NULL, receiver_number VARCHAR(255) NOT NULL, receiver_id_card VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user ADD roles JSON NOT NULL, ADD nom VARCHAR(255) DEFAULT NULL, ADD prenom VARCHAR(255) DEFAULT NULL, ADD telephone VARCHAR(30) NOT NULL, ADD adresse VARCHAR(255) DEFAULT NULL, ADD statut VARCHAR(30) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE agence');
        $this->addSql('DROP TABLE compte');
        $this->addSql('DROP TABLE transaction');
        $this->addSql('ALTER TABLE `user` DROP roles, DROP nom, DROP prenom, DROP telephone, DROP adresse, DROP statut');
    }
}
