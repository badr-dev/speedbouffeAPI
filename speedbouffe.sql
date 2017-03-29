-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Mar 29, 2017 at 04:45 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `speedbouffe`
--

-- --------------------------------------------------------

--
-- Table structure for table `acheteur`
--

CREATE TABLE `acheteur` (
  `id` int(11) NOT NULL,
  `nom` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `prenom` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `civilite_id` int(11) NOT NULL,
  `statut_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `commandes`
--

CREATE TABLE `commandes` (
  `id` int(11) NOT NULL,
  `jour_commande` datetime NOT NULL,
  `heure_livraison` datetime NOT NULL,
  `heure_commande` datetime NOT NULL,
  `type_payement_id` int(11) NOT NULL,
  `acheteur_id` int(11) NOT NULL,
  `nb_repas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ref_statut_acheteur`
--

CREATE TABLE `ref_statut_acheteur` (
  `id` int(11) NOT NULL,
  `statut` varchar(42) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ref_type_civilite`
--

CREATE TABLE `ref_type_civilite` (
  `id` int(11) NOT NULL,
  `civilite` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ref_type_menu`
--

CREATE TABLE `ref_type_menu` (
  `id` int(11) NOT NULL,
  `menu` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `prix` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ref_type_payement`
--

CREATE TABLE `ref_type_payement` (
  `id` int(11) NOT NULL,
  `payement` varchar(42) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ref_type_tarif`
--

CREATE TABLE `ref_type_tarif` (
  `id` int(11) NOT NULL,
  `tarif` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `reduction` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `repas_commande`
--

CREATE TABLE `repas_commande` (
  `id` int(11) NOT NULL,
  `commande_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `civilite_id` int(11) NOT NULL,
  `nom` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `prenom` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `age` int(11) NOT NULL,
  `tarif_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `acheteur`
--
ALTER TABLE `acheteur`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_statut_acheteur`
--
ALTER TABLE `ref_statut_acheteur`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_type_civilite`
--
ALTER TABLE `ref_type_civilite`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_type_menu`
--
ALTER TABLE `ref_type_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_type_payement`
--
ALTER TABLE `ref_type_payement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_type_tarif`
--
ALTER TABLE `ref_type_tarif`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `repas_commande`
--
ALTER TABLE `repas_commande`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `acheteur`
--
ALTER TABLE `acheteur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ref_statut_acheteur`
--
ALTER TABLE `ref_statut_acheteur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ref_type_civilite`
--
ALTER TABLE `ref_type_civilite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ref_type_menu`
--
ALTER TABLE `ref_type_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ref_type_payement`
--
ALTER TABLE `ref_type_payement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ref_type_tarif`
--
ALTER TABLE `ref_type_tarif`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `repas_commande`
--
ALTER TABLE `repas_commande`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
