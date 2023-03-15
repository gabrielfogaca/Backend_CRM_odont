-- MySQL Workbench Synchronization
-- Generated: 2023-03-15 12:01
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: tsdor

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `mydb`.`pacientes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NULL DEFAULT NULL,
  `endereco` VARCHAR(50) NULL DEFAULT NULL,
  `cpf` VARCHAR(15) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`anamnese` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `dados` LONGTEXT NULL DEFAULT NULL,
  `pacientes_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `pacientes_id`),
  INDEX `fk_anamnese_pacientes_idx` (`pacientes_id` ASC) VISIBLE,
  CONSTRAINT `fk_anamnese_pacientes`
    FOREIGN KEY (`pacientes_id`)
    REFERENCES `mydb`.`pacientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(10) NULL DEFAULT NULL,
  `password` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`atendimentos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `data_atendimento` DATE NULL DEFAULT NULL,
  `estado` CHAR(2) NULL DEFAULT NULL,
  `tipo` CHAR(2) NULL DEFAULT NULL,
  `pacientes_id` INT(11) NOT NULL,
  `usuarios_id` INT(11) NOT NULL,
  `forma_pgto_id` INT(11) NOT NULL,
  `dentistas_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `pacientes_id`, `usuarios_id`, `forma_pgto_id`, `dentistas_id`),
  INDEX `fk_atendimentos_pacientes1_idx` (`pacientes_id` ASC) VISIBLE,
  INDEX `fk_atendimentos_usuarios1_idx` (`usuarios_id` ASC) VISIBLE,
  INDEX `fk_atendimentos_forma_pgto1_idx` (`forma_pgto_id` ASC) VISIBLE,
  INDEX `fk_atendimentos_dentistas1_idx` (`dentistas_id` ASC) VISIBLE,
  CONSTRAINT `fk_atendimentos_pacientes1`
    FOREIGN KEY (`pacientes_id`)
    REFERENCES `mydb`.`pacientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_atendimentos_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `mydb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_atendimentos_forma_pgto1`
    FOREIGN KEY (`forma_pgto_id`)
    REFERENCES `mydb`.`forma_pgto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_atendimentos_dentistas1`
    FOREIGN KEY (`dentistas_id`)
    REFERENCES `mydb`.`dentistas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`itens_atendimento` (
  `atendimentos_id` INT(11) NOT NULL,
  `procediementos_id` INT(11) NOT NULL,
  `dente` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`atendimentos_id`, `procediementos_id`),
  INDEX `fk_itens_atendimento_procediementos1_idx` (`procediementos_id` ASC) VISIBLE,
  CONSTRAINT `fk_itens_atendimento_atendimentos1`
    FOREIGN KEY (`atendimentos_id`)
    REFERENCES `mydb`.`atendimentos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens_atendimento_procediementos1`
    FOREIGN KEY (`procediementos_id`)
    REFERENCES `mydb`.`procediementos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`procediementos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(50) NULL DEFAULT NULL,
  `valor` DECIMAL(15,3) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`forma_pgto` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`dentistas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`caixa` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `saldo_anterior` DECIMAL(15,3) NULL DEFAULT NULL,
  `saldo_atual` DECIMAL(15,3) NULL DEFAULT NULL,
  `data_cx` DATE NULL DEFAULT NULL,
  `observacao` VARCHAR(80) NULL DEFAULT NULL,
  `atendimentos_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `atendimentos_id`),
  INDEX `fk_caixa_atendimentos1_idx` (`atendimentos_id` ASC) VISIBLE,
  CONSTRAINT `fk_caixa_atendimentos1`
    FOREIGN KEY (`atendimentos_id`)
    REFERENCES `mydb`.`atendimentos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
