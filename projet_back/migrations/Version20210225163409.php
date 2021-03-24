<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210225163409 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE client (id INT AUTO_INCREMENT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, telephone VARCHAR(255) NOT NULL, id_card VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE transaction ADD send_from_id INT NOT NULL, ADD send_to_id INT NOT NULL, DROP sender_name, DROP sender_last_name, DROP sender_number, DROP sender_id_card, DROP receiver_name, DROP receiver_last_name, DROP receiver_number, DROP receiver_id_card');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1AE87AC65 FOREIGN KEY (send_from_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D159574F23 FOREIGN KEY (send_to_id) REFERENCES client (id)');
        $this->addSql('CREATE INDEX IDX_723705D1AE87AC65 ON transaction (send_from_id)');
        $this->addSql('CREATE INDEX IDX_723705D159574F23 ON transaction (send_to_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D1AE87AC65');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D159574F23');
        $this->addSql('DROP TABLE client');
        $this->addSql('DROP INDEX IDX_723705D1AE87AC65 ON transaction');
        $this->addSql('DROP INDEX IDX_723705D159574F23 ON transaction');
        $this->addSql('ALTER TABLE transaction ADD sender_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD sender_last_name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, ADD sender_number VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD sender_id_card VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD receiver_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD receiver_last_name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, ADD receiver_number VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD receiver_id_card VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, DROP send_from_id, DROP send_to_id');
    }
}
