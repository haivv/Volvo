-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2023 at 08:09 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `volvo`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `idNotice` int(11) NOT NULL,
  `comWriter` varchar(20) NOT NULL,
  `comDate` varchar(20) NOT NULL,
  `comContent` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `idNotice`, `comWriter`, `comDate`, `comContent`) VALUES
(9, 15, 'user25', '2023-07-26', 'have a nice day!');

-- --------------------------------------------------------

--
-- Table structure for table `notice`
--

CREATE TABLE `notice` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `dateCreate` varchar(20) NOT NULL,
  `writer` varchar(20) NOT NULL,
  `comment` int(11) NOT NULL,
  `content` text NOT NULL,
  `imgUpload` varchar(50) NOT NULL,
  `fileUpload` varchar(50) NOT NULL,
  `videoUpload` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notice`
--

INSERT INTO `notice` (`id`, `title`, `category`, `dateCreate`, `writer`, `comment`, `content`, `imgUpload`, `fileUpload`, `videoUpload`) VALUES
(9, 'New title 07-25', 'Opinion', '2023-07-26', 'user25', 0, '\'<p><strong>Title</strong></p>\r\n\r\n<p>Content</p>\r\n\'', 'user25_Hai.png', '', 'user25_video.mp4'),
(13, 'New title', 'Announcement', '2023-07-26', 'user25', 0, '\'<p><strong><span style=\"font-size:24px\">Title</span></strong></p>\r\n\r\n<p><span style=\"color:#e74c3c\">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC</span>, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of &quot;de Finibus Bonorum et Malorum&quot; (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, &quot;Lorem ipsum dolor sit amet..&quot;, comes from a line in section 1.10.32.</p>\r\n\'', '20230726_desktop.png', '20230726_aa.txt', ''),
(15, 'New title 07-25', 'Suggestion', '2023-07-26', 'user25', 1, '\'<h2>Where does it come from?</h2>\r\n\r\n<p><span style=\"color:#e67e22\">C</span><span style=\"font-size:16px\"><span style=\"color:#e67e22\">ontrary</span><span style=\"color:#e74c3c\"> to popular belief, Lorem Ipsum is not simply random text.</span></span> It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.&nbsp;</p>\r\n\'', '20230726_happy teacher day.png', '20230726_DataImport.xlsx', '20230726_video3.mp4'),
(17, 'New title 07-17', 'Announcement', '2023-07-26', 'undefined', 0, '\'\'', 'undefined_happy teacher day.png', 'undefined_aa.txt', 'undefined_video.mp4'),
(18, 'New title 07-25', 'Opinion', '2023-07-26', 'user25', 0, '\'<p>Title</p>\r\n\r\n<p>Content</p>\r\n\'', 'user25_happy teacher day.png', 'user25_aa.txt', 'user25_video.mp4');

-- --------------------------------------------------------

--
-- Table structure for table `platform`
--

CREATE TABLE `platform` (
  `id` int(11) NOT NULL,
  `user` varchar(20) NOT NULL,
  `ip` text NOT NULL,
  `platform` text NOT NULL,
  `logintime` text NOT NULL,
  `logouttime` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `platform`
--

INSERT INTO `platform` (`id`, `user`, `ip`, `platform`, `logintime`, `logouttime`) VALUES
(120, '', '192.168.0.51', 'desktop', '2023-06-22 17:29:19', '2023-06-22 17:29:34'),
(122, '', '192.168.0.51', 'desktop', '2023-06-23 10:40:10', '2023-06-23 10:40:58'),
(123, '', '192.168.0.51', 'desktop', '2023-06-23 10:58:15', '2023-06-23 10:58:29'),
(125, '', '192.168.0.51', 'desktop', '2023-06-23 10:58:58', '2023-06-23 11:6:6'),
(127, '', '192.168.0.51', 'desktop', '2023-06-23 11:10:39', '2023-06-23 11:10:47'),
(128, '', '192.168.0.51', 'desktop', '2023-06-23 11:17:5', '2023-06-23 11:17:6'),
(129, '', '192.168.0.51', 'desktop', '2023-06-23 11:36:1', '2023-06-23 11:36:20'),
(130, '', '192.168.0.51', 'desktop', '2023-06-23 13:42:26', '2023-06-23 13:42:41'),
(134, '', '192.168.0.51', 'desktop', '2023-06-23 17:48:0', '2023-06-23 17:48:3'),
(136, '', '192.168.0.51', 'desktop', '2023-06-23 17:50:5', '2023-06-23 17:50:16'),
(137, '', '192.168.0.51', 'desktop', '2023-06-23 17:52:44', '2023-06-23 17:52:50'),
(139, '', '192.168.0.51', 'desktop', '2023-06-26 9:45:21', '2023-06-26 9:45:32'),
(141, '', '192.168.0.51', 'desktop', '2023-06-27 9:22:8', '2023-06-27 9:23:29'),
(148, '', '192.168.0.51', 'desktop', '2023-06-30 11:14:3', ''),
(149, '', '192.168.0.51', 'desktop', '2023-06-30 11:14:7', ''),
(150, '', '192.168.0.51', 'desktop', '2023-06-30 11:14:13', ''),
(151, '', '192.168.0.51', 'desktop', '2023-06-30 11:14:17', ''),
(152, '', '192.168.0.51', 'desktop', '2023-06-30 11:14:20', ''),
(153, 'user', 'ip', 'platform', 'time', ''),
(154, 'user', 'ip', 'platform', 'time2', 'logoutime'),
(155, 'user', '127.0.0.1', 'PC', '2023-07-12 10:52:04', ''),
(156, 'user', '127.0.0.1', 'PC', '2023-07-12 10:57:27', ''),
(157, 'user', '127.0.0.1', 'PC', '2023-07-12 10:57:35', ''),
(158, 'user', '127.0.0.1', 'PC', '2023-07-12 11:04:00', ''),
(159, 'user', '999.0.0.1', 'PC', '2023-07-12 11:04:50', 'logoutime'),
(160, 'web_user', '127.0.0.1', 'PC', '2023-07-12 11:11:19', ''),
(161, 'user', '999.0.0.1', 'PC', '2023-07-12 11:11:47', ''),
(162, 'web_user', '127.0.0.1', 'PC', '2023-07-12 11:13:45', ''),
(163, 'user', '999.0.0.1', 'PC', '2023-07-12 11:16:18', '2023-07-12 11:16:32'),
(164, 'user', '999.0.0.1', 'PC', '2023-07-12 11:16:33', '2023-07-12 11:16:51'),
(165, 'user', '999.0.0.1', 'PC', '2023-07-12 11:16:58', ''),
(166, 'user', '127.0.0.1', 'PC', '2023-07-12 11:18:48', ''),
(167, 'user', '127.0.0.1', 'PC', '2023-07-12 11:19:09', ''),
(168, 'user', '999.0.0.1', 'PC', '2023-07-12 11:29:26', ''),
(169, 'user', '999.0.0.1', 'PC', '2023-07-12 11:34:27', '2023-07-12 11:34:36'),
(170, 'user', '999.0.0.1', 'PC', '2023-07-12 11:34:38', ''),
(171, 'user', '999.0.0.1', 'PC', '2023-07-12 11:35:10', '2023-07-12 11:35:17'),
(172, 'user', '999.0.0.1', 'PC', '2023-07-12 11:35:18', ''),
(173, 'user', '999.0.0.1', 'PC', '2023-07-12 11:37:33', '2023-07-12 11:37:41'),
(174, 'user', '999.0.0.1', 'PC', '2023-07-12 11:37:43', ''),
(175, 'user', '999.0.0.1', 'PC', '2023-07-12 11:37:57', ''),
(176, 'user', '999.0.0.1', 'PC', '2023-07-12 11:38:39', ''),
(177, 'user', '999.0.0.1', 'PC', '2023-07-12 11:44:06', '2023-07-12 11:44:22'),
(178, 'user', '999.0.0.1', 'PC', '2023-07-12 11:44:23', ''),
(179, 'user', '999.0.0.1', 'PC', '2023-07-12 11:45:31', '2023-07-12 11:46:43'),
(180, 'web_user', '999.0.0.1', 'PC', '2023-07-12 11:53:06', ''),
(181, 'web_user', '999.0.0.1', 'PC', '2023-07-12 11:54:03', ''),
(182, 'web_user', '999.0.0.1', 'PC', '2023-07-12 11:55:48', ''),
(183, 'web_user', '999.0.0.1', 'PC', '2023-07-12 11:58:39', '2023-07-12 12:01:52'),
(184, 'web_user', '999.0.0.1', 'PC', '2023-07-12 12:01:53', ''),
(185, 'user', '999.0.0.1', 'PC', '2023-07-12 12:03:03', ''),
(186, 'user', '999.0.0.1', 'PC', '2023-07-12 12:04:16', ''),
(187, 'user', '999.0.0.1', 'PC', '2023-07-12 12:06:43', ''),
(188, 'user', '999.0.0.1', 'PC', '2023-07-12 12:11:53', '');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`idUser`, `username`, `password`) VALUES
(1, 'admin', '123'),
(2, 'member', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNotice` (`idNotice`);

--
-- Indexes for table `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `platform`
--
ALTER TABLE `platform`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `platform`
--
ALTER TABLE `platform`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`idNotice`) REFERENCES `notice` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
