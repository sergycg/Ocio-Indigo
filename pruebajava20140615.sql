# SQL Manager 2005 for MySQL 3.7.0.1
# ---------------------------------------
# Host     : localhost
# Port     : 3306
# Database : pruebajava


SET FOREIGN_KEY_CHECKS=0;

DROP DATABASE IF EXISTS `pruebajava`;

CREATE DATABASE `pruebajava`
    CHARACTER SET 'utf8'
    COLLATE 'utf8_general_ci';

USE `pruebajava`;

#
# Structure for the `cliente` table : 
#

DROP TABLE IF EXISTS `cliente`;

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL auto_increment,
  `nombre` varchar(50) default NULL,
  `apellidos` varchar(200) default NULL,
  `direccion` varchar(500) default NULL,
  `codigoPostal` varchar(5) default NULL,
  `telefono` varchar(9) default NULL,
  `movil` varchar(9) default NULL,
  `otro` varchar(9) default NULL,
  `observaciones` varchar(2000) default NULL,
  PRIMARY KEY  (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

#
# Data for the `cliente` table  (LIMIT 0,500)
#

INSERT INTO `cliente` (`idCliente`, `nombre`, `apellidos`, `direccion`, `codigoPostal`, `telefono`, `movil`, `otro`, `observaciones`) VALUES 
  (1,'Pepita','Perez','Fermin caballero 23','28034','911111111','600111222','','hermana de juanita'),
  (2,'Juanita','Lopez','Sangenjo 2','28034','912222222','666666666',NULL,NULL),
  (5,'julian','fernandez','','','666666666','','','');

COMMIT;

#
# Structure for the `cuenta` table : 
#

DROP TABLE IF EXISTS `cuenta`;

CREATE TABLE `cuenta` (
  `idCuenta` int(11) NOT NULL auto_increment,
  `activa` tinyint(1) default NULL,
  `fechaAlta` date default NULL,
  `fechaModificacion` date default NULL,
  `observaciones` varchar(2000) default NULL,
  `idCliente` int(11) NOT NULL,
  PRIMARY KEY  (`idCuenta`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `cuenta_cliente_fk` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Data for the `cuenta` table  (LIMIT 0,500)
#

INSERT INTO `cuenta` (`idCuenta`, `activa`, `fechaAlta`, `fechaModificacion`, `observaciones`, `idCliente`) VALUES 
  (1,1,'2014-05-15','2014-06-15',NULL,1),
  (2,1,'2014-05-08','2014-05-08',NULL,2),
  (3,1,'2014-06-15','2014-06-15',NULL,5);

COMMIT;

#
# Structure for the `compra` table : 
#

DROP TABLE IF EXISTS `compra`;

CREATE TABLE `compra` (
  `idCompra` int(11) NOT NULL auto_increment,
  `numFactura` varchar(20) default NULL,
  `codObjeto` int(11) default NULL,
  `descObjeto` varchar(50) default NULL,
  `fecha` date default NULL,
  `precio` float(9,2) default NULL,
  `idCuenta` int(11) NOT NULL,
  PRIMARY KEY  (`idCompra`),
  KEY `idCuenta` (`idCuenta`),
  CONSTRAINT `compra_cuenta_fk` FOREIGN KEY (`idCuenta`) REFERENCES `cuenta` (`idCuenta`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Data for the `compra` table  (LIMIT 0,500)
#

INSERT INTO `compra` (`idCompra`, `numFactura`, `codObjeto`, `descObjeto`, `fecha`, `precio`, `idCuenta`) VALUES 
  (1,NULL,NULL,'sortija','2014-05-15',331.2,1),
  (2,NULL,2,'collar','2014-05-16',450,1),
  (3,NULL,NULL,'pulsera','2014-05-15',320,2);

COMMIT;

#
# Structure for the `entrega` table : 
#

DROP TABLE IF EXISTS `entrega`;

CREATE TABLE `entrega` (
  `idEntrega` int(11) NOT NULL auto_increment,
  `fecha` date default NULL,
  `entrega` float(9,3) default NULL,
  `idCuenta` int(11) NOT NULL,
  PRIMARY KEY  (`idEntrega`),
  KEY `idCuenta` (`idCuenta`),
  CONSTRAINT `entrega_cuenta_fk` FOREIGN KEY (`idCuenta`) REFERENCES `cuenta` (`idCuenta`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

#
# Data for the `entrega` table  (LIMIT 0,500)
#

INSERT INTO `entrega` (`idEntrega`, `fecha`, `entrega`, `idCuenta`) VALUES 
  (1,'2014-05-15',51,1),
  (2,'2014-05-08',21.8,1),
  (3,'2014-05-16',25,1),
  (5,'2014-05-17',60,2),
  (9,'2014-06-08',50,1);

COMMIT;

#
# Structure for the `pruebatabla` table : 
#

DROP TABLE IF EXISTS `pruebatabla`;

CREATE TABLE `pruebatabla` (
  `id` int(11) default NULL,
  `nombre` varchar(20) default NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for the `pruebatabla` table  (LIMIT 0,500)
#

INSERT INTO `pruebatabla` (`id`, `nombre`) VALUES 
  (1,'pepe'),
  (2,'paco'),
  (3,'juan'),
  (4,'alfredo');

COMMIT;

#
# Definition for the `vw_cuenta_cliente` view : 
#

DROP VIEW IF EXISTS `vw_cuenta_cliente`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_cuenta_cliente` AS 
  select 
    `cli`.`idCliente` AS `ID_CLIENTE`,
    `cu`.`idCuenta` AS `ID_CUENTA`,
    `cli`.`nombre` AS `NOMBRE`,
    `cli`.`apellidos` AS `APELLIDOS`,
    `cli`.`direccion` AS `DIRECCION`,
    `cli`.`codigoPostal` AS `COD_POSTAL`,
    `cli`.`telefono` AS `TELEFONO`,
    `cli`.`movil` AS `MOVIL`,
    `cli`.`otro` AS `OTRO`,
    `cli`.`observaciones` AS `CLI_OBSERVACIONES`,
    `cu`.`fechaAlta` AS `FECHA_ALTA`,
    `cu`.`fechaModificacion` AS `FECHA_MODIF`,
    `cu`.`activa` AS `IND_ACTIVA`,
    `cu`.`observaciones` AS `CU_OBSERVACIONES` 
  from 
    (`cliente` `CLI` join `cuenta` `CU`) 
  where 
    (`cli`.`idCliente` = `cu`.`idCliente`);

