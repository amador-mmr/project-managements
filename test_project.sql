-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 21, 2023 at 01:41 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_project`
--
CREATE DATABASE IF NOT EXISTS `test_project` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `test_project`;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
  `ID_PROJECT` varchar(150) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `CODE_3` varchar(3) NOT NULL,
  `ACQUISITION_DATE` datetime DEFAULT NULL,
  `DEAL_TYPE` varchar(100) NOT NULL,
  `ID_GROUP` varchar(100) NOT NULL,
  `STATUS` varchar(100) NOT NULL,
  `KW` int(11) NOT NULL,
  `MONTHS_ACQUIRED` int(11) DEFAULT NULL,
  `ID_COMPANY` int(11) NOT NULL,
  PRIMARY KEY (`ID_PROJECT`),
  UNIQUE KEY `project_un` (`NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`ID_PROJECT`, `NAME`, `CODE_3`, `ACQUISITION_DATE`, `DEAL_TYPE`, `ID_GROUP`, `STATUS`, `KW`, `MONTHS_ACQUIRED`, `ID_COMPANY`) VALUES
('003', 'Project 1', 'HAS', NULL, 'Share', 'RW 1', '1 Acquisition', 7500, NULL, 19),
('005', 'Project 2', 'HOL', '2019-09-02 00:00:00', 'Asset', 'RW 2', '3 Operating', 3300, 23, 10),
('007', 'Project 3', 'JES', '2019-09-02 00:00:00', 'Share', 'RW 1', '2 in Development', 2300, 23, 11);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `username` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`) VALUES
('admin', '$2b$10$Db4Wef/uxbhMQr2fs4bWLu7g/P.YwVSrWegnGGHUtiD8hKtWv.ovm'),
('administrator', '$2b$10$Db4Wef/uxbhMQr2fs4bWLu7g/P.YwVSrWegnGGHUtiD8hKtWv.ovm');

-- --------------------------------------------------------

--
-- Table structure for table `wgt`
--

DROP TABLE IF EXISTS `wgt`;
CREATE TABLE IF NOT EXISTS `wgt` (
  `WGT_NUMBER` varchar(100) NOT NULL,
  `ID_PROJECT` varchar(100) NOT NULL,
  PRIMARY KEY (`WGT_NUMBER`,`ID_PROJECT`),
  KEY `wgt_FK` (`ID_PROJECT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wgt`
--

INSERT INTO `wgt` (`WGT_NUMBER`, `ID_PROJECT`) VALUES
('V70813', '003'),
('V70814', '003'),
('V70815', '003'),
('V70816', '003'),
('V70817', '003'),
('V18320', '005'),
('V18321', '005');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `wgt`
--
ALTER TABLE `wgt`
  ADD CONSTRAINT `wgt_FK` FOREIGN KEY (`ID_PROJECT`) REFERENCES `project` (`ID_PROJECT`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
