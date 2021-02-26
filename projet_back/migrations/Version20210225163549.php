<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210225163549 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE agence (id INT AUTO_INCREMENT NOT NULL, adresse VARCHAR(255) NOT NULL, telephone VARCHAR(255) NOT NULL, lattitude DOUBLE PRECISION DEFAULT NULL, longitude DOUBLE PRECISION DEFAULT NULL, statut VARCHAR(30) DEFAULT NULL, nom VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE agence_user (agence_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_EE8008A1D725330D (agence_id), INDEX IDX_EE8008A1A76ED395 (user_id), PRIMARY KEY(agence_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE client (id INT AUTO_INCREMENT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, telephone VARCHAR(255) NOT NULL, id_card VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE compte (id INT AUTO_INCREMENT NOT NULL, agence_id INT NOT NULL, numero VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT NULL, solde VARCHAR(255) NOT NULL, statut VARCHAR(30) DEFAULT NULL, INDEX IDX_CFF65260D725330D (agence_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE transaction (id INT AUTO_INCREMENT NOT NULL, sender_id INT DEFAULT NULL, withdrawer_id INT DEFAULT NULL, send_from_id INT NOT NULL, send_to_id INT NOT NULL, code VARCHAR(255) NOT NULL, montant DOUBLE PRECISION NOT NULL, send_at DATETIME NOT NULL, retired_at DATETIME DEFAULT NULL, frais DOUBLE PRECISION NOT NULL, part_depot DOUBLE PRECISION NOT NULL, part_retrait DOUBLE PRECISION NOT NULL, part_etat DOUBLE PRECISION NOT NULL, part_systeme DOUBLE PRECISION NOT NULL, etat VARCHAR(100) NOT NULL, INDEX IDX_723705D1F624B39D (sender_id), INDEX IDX_723705D12C3BBF57 (withdrawer_id), INDEX IDX_723705D1AE87AC65 (send_from_id), INDEX IDX_723705D159574F23 (send_to_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, agence_id INT DEFAULT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, nom VARCHAR(255) DEFAULT NULL, prenom VARCHAR(255) DEFAULT NULL, telephone VARCHAR(30) NOT NULL, adresse VARCHAR(255) DEFAULT NULL, statut VARCHAR(30) DEFAULT NULL, INDEX IDX_8D93D649D725330D (agence_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE agence_user ADD CONSTRAINT FK_EE8008A1D725330D FOREIGN KEY (agence_id) REFERENCES agence (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE agence_user ADD CONSTRAINT FK_EE8008A1A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE compte ADD CONSTRAINT FK_CFF65260D725330D FOREIGN KEY (agence_id) REFERENCES agence (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1F624B39D FOREIGN KEY (sender_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D12C3BBF57 FOREIGN KEY (withdrawer_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1AE87AC65 FOREIGN KEY (send_from_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D159574F23 FOREIGN KEY (send_to_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE `user` ADD CONSTRAINT FK_8D93D649D725330D FOREIGN KEY (agence_id) REFERENCES agence (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE agence_user DROP FOREIGN KEY FK_EE8008A1D725330D');
        $this->addSql('ALTER TABLE compte DROP FOREIGN KEY FK_CFF65260D725330D');
        $this->addSql('ALTER TABLE `user` DROP FOREIGN KEY FK_8D93D649D725330D');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D1AE87AC65');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D159574F23');
        $this->addSql('ALTER TABLE agence_user DROP FOREIGN KEY FK_EE8008A1A76ED395');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D1F624B39D');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D12C3BBF57');
        $this->addSql('DROP TABLE agence');
        $this->addSql('DROP TABLE agence_user');
        $this->addSql('DROP TABLE client');
        $this->addSql('DROP TABLE compte');
        $this->addSql('DROP TABLE transaction');
        $this->addSql('DROP TABLE `user`');
    }
}
