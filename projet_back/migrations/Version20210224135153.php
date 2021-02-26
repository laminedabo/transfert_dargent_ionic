<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210224135153 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE agence_user (agence_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_EE8008A1D725330D (agence_id), INDEX IDX_EE8008A1A76ED395 (user_id), PRIMARY KEY(agence_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE agence_user ADD CONSTRAINT FK_EE8008A1D725330D FOREIGN KEY (agence_id) REFERENCES agence (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE agence_user ADD CONSTRAINT FK_EE8008A1A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE compte ADD agence_id INT NOT NULL');
        $this->addSql('ALTER TABLE compte ADD CONSTRAINT FK_CFF65260D725330D FOREIGN KEY (agence_id) REFERENCES agence (id)');
        $this->addSql('CREATE INDEX IDX_CFF65260D725330D ON compte (agence_id)');
        $this->addSql('ALTER TABLE transaction ADD sender_id INT NOT NULL, ADD withdrawer_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1F624B39D FOREIGN KEY (sender_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D12C3BBF57 FOREIGN KEY (withdrawer_id) REFERENCES `user` (id)');
        $this->addSql('CREATE INDEX IDX_723705D1F624B39D ON transaction (sender_id)');
        $this->addSql('CREATE INDEX IDX_723705D12C3BBF57 ON transaction (withdrawer_id)');
        $this->addSql('ALTER TABLE user ADD agence_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649D725330D FOREIGN KEY (agence_id) REFERENCES agence (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649D725330D ON user (agence_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE agence_user');
        $this->addSql('ALTER TABLE compte DROP FOREIGN KEY FK_CFF65260D725330D');
        $this->addSql('DROP INDEX IDX_CFF65260D725330D ON compte');
        $this->addSql('ALTER TABLE compte DROP agence_id');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D1F624B39D');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D12C3BBF57');
        $this->addSql('DROP INDEX IDX_723705D1F624B39D ON transaction');
        $this->addSql('DROP INDEX IDX_723705D12C3BBF57 ON transaction');
        $this->addSql('ALTER TABLE transaction DROP sender_id, DROP withdrawer_id');
        $this->addSql('ALTER TABLE `user` DROP FOREIGN KEY FK_8D93D649D725330D');
        $this->addSql('DROP INDEX IDX_8D93D649D725330D ON `user`');
        $this->addSql('ALTER TABLE `user` DROP agence_id');
    }
}
