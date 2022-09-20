-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2022 at 07:56 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scholarship_webapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `announce`
--

CREATE TABLE `announce` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `detail` varchar(500) NOT NULL,
  `image_data` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `announce`
--

INSERT INTO `announce` (`id`, `title`, `detail`, `image_data`, `date`) VALUES
(24, 'ประกาศนิสิตที่สมัครทุนเรียนดี', 'นิสิตที่มีรายชื่อดังต่อไปนี้\nนางสาวชลธิชา ปาณะวีระ\nนางสาวดวงพร โนนไกร', '', '2022-04-10 15:09:34'),
(25, 'ทุนช่วยเหลือนิสิตที่ได้รับผลกระทบจาก Covid-19', 'สำหรับนิสิตที่มีความเดือดร้อนด้านเศรษฐกิจและประสบปัญหาภาระค่าใช้จ่ายในการศึกษา\nทางมหาลัยมีทุนช่วยเหลือ', 'https://sv1.picz.in.th/images/2022/09/20/pzYl7E.png', '2022-09-20 17:49:48'),
(27, 'มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขต ศรีราชา', 'มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขต ศรีราชา', 'https://sv1.picz.in.th/images/2022/09/20/pzYOqk.png', '2022-09-20 17:49:35');

-- --------------------------------------------------------

--
-- Table structure for table `donator`
--

CREATE TABLE `donator` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donator`
--

INSERT INTO `donator` (`id`, `name`) VALUES
(1, 'มหาวิทยาลัยเกษตรศาสตร์'),
(2, 'คุณเขต'),
(3, 'คุณตี๋'),
(4, 'ผู้ใหญ่แห่งวงการโปรแกรมเมอร์'),
(5, 'อจารย์กาญจนา');

-- --------------------------------------------------------

--
-- Table structure for table `form`
--

CREATE TABLE `form` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `scholarship_id` int(11) NOT NULL,
  `profile_detail` longtext NOT NULL,
  `status` int(11) NOT NULL,
  `file` longtext NOT NULL,
  `rate` longtext NOT NULL,
  `notation` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `form`
--

INSERT INTO `form` (`id`, `user_id`, `scholarship_id`, `profile_detail`, `status`, `file`, `rate`, `notation`) VALUES
(1, 1, 1, '{\"name\":\"ธนธรณ์ บุญประเสริฐ\",\"yearofstudy\":\"\",\"age\":\"0023-12-31\",\"std_id\":\"6230300419\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"146/17 จังหวัดระยอง\",\"tel\":\"0998895368\",\"name_father\":\"คุณพ่อ บิดา\",\"age_father\":\"50\",\"career_father\":\"ราชการ\",\"income_father\":\"30000\",\"address_father\":\"155/33 จังหวัดระยอง\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"โรงพัก\",\"tel_father\":\"099999\",\"name_mother\":\"คุณแม่ มารดา\",\"age_mother\":\"40\",\"career_mother\":\"ธุรกิจส่วนตัว\",\"income_mother\":\"20000\",\"address_mother\":\"66/44 จังหวัดระยอง\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"บ้าน\",\"tel_mother\":\"08888\",\"status_marry\":\"หย่าร้าง\",\"gpa\":\"2.7\",\"birth_date\":\"2001-01-16\"}', 4, '[{\"hashID\":\"px8uupo\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"JPG, PNG\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"https://sv1.picz.in.th/images/2022/09/20/pzSz1I.png\"},{\"hashID\":\"ug0yjnz\",\"title\":\"เกรดเฉลี่ยสะสม\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf\"}]', '[{\"hashID\":\"k688e29\",\"title\":\"เกณฑที่ 1\",\"type\":\"score10\",\"weight\":\"70\"},{\"hashID\":\"gtibb7f\",\"title\":\"เกณฑที่ 2\",\"type\":\"score10\",\"weight\":\"30\"}]', 'รเอกสารไม่ครบถ้วน'),
(2, 1, 4, '{\"name\":\"ธนธรณ์ บุญประเสริฐ\",\"yearofstudy\":\"\",\"age\":\"0023-12-31\",\"std_id\":\"6230300419\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"146/17 จังหวัดระยอง\",\"tel\":\"0998895368\",\"name_father\":\"คุณพ่อ บิดา\",\"age_father\":\"50\",\"career_father\":\"ราชการ\",\"income_father\":\"30000\",\"address_father\":\"155/33 จังหวัดระยอง\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"โรงพัก\",\"tel_father\":\"099999\",\"name_mother\":\"คุณแม่ มารดา\",\"age_mother\":\"40\",\"career_mother\":\"ธุรกิจส่วนตัว\",\"income_mother\":\"20000\",\"address_mother\":\"66/44 จังหวัดระยอง\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"บ้าน\",\"tel_mother\":\"08888\",\"status_marry\":\"หย่าร้าง\",\"gpa\":\"2.7\",\"birth_date\":\"2001-01-16\"}', 1, '[{\"hashID\":\"bm1jb2b\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf\"},{\"hashID\":\"u8nwuim\",\"title\":\"ทะเบียนบ้าน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf\"}]', '', ''),
(3, 1, 5, '{\"name\":\"ธนธรณ์ บุญประเสริฐ\",\"yearofstudy\":\"\",\"age\":\"0023-12-31\",\"std_id\":\"6230300419\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"146/17 จังหวัดระยอง\",\"tel\":\"0998895368\",\"name_father\":\"คุณพ่อ บิดา\",\"age_father\":\"50\",\"career_father\":\"ราชการ\",\"income_father\":\"30000\",\"address_father\":\"155/33 จังหวัดระยอง\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"โรงพัก\",\"tel_father\":\"099999\",\"name_mother\":\"คุณแม่ มารดา\",\"age_mother\":\"40\",\"career_mother\":\"ธุรกิจส่วนตัว\",\"income_mother\":\"20000\",\"address_mother\":\"66/44 จังหวัดระยอง\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"บ้าน\",\"tel_mother\":\"08888\",\"status_marry\":\"หย่าร้าง\",\"gpa\":\"2.7\",\"birth_date\":\"2001-01-16\"}', 1, '[{\"hashID\":\"fc8dsvg\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf\"}]', '', ''),
(4, 1, 2, '{\"name\":\"ธนธรณ์ บุญประเสริฐ\",\"yearofstudy\":\"\",\"age\":\"0023-12-31\",\"std_id\":\"6230300419\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"146/17 จังหวัดระยอง\",\"tel\":\"0998895368\",\"name_father\":\"12412\",\"age_father\":\"124124\",\"career_father\":\"12412\",\"income_father\":\"241\",\"address_father\":\"1241\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"24124\",\"tel_father\":\"4124\",\"name_mother\":\"124124124\",\"age_mother\":\"12412\",\"career_mother\":\"124\",\"income_mother\":\"124\",\"address_mother\":\"124\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"124\",\"tel_mother\":\"12412\",\"status_marry\":\"หย่าร้าง\",\"gpa\":\"2.7\",\"birth_date\":\"2001-01-16\"}', 2, '[{\"hashID\":\"satybsw\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"\"}]', '', 'รูปไม่ถูกต้อง'),
(5, 2, 3, '{\"name\":\"จักรพงษ์\",\"yearofstudy\":\"\",\"birth_date\":\"2000-06-23\",\"std_id\":\"6230301130\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"140\",\"tel\":\"0641150359\",\"name_father\":\"เสรี\",\"age_father\":\"60\",\"career_father\":\"บรื้่น\",\"income_father\":\"12\",\"address_father\":\"กทม\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"กทม\",\"tel_father\":\"0641150359\",\"name_mother\":\"จันทร์สวาท เกษร\",\"age_mother\":\"50\",\"career_mother\":\"บักๆๆ\",\"income_mother\":\"12\",\"address_mother\":\"ปทม\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"ปทม\",\"tel_mother\":\"0641150359\",\"status_marry\":\"อยู่ด้วยกัน\",\"gpa\":\"2.00\"}', 4, '[{\"hashID\":\"px8uupo\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"JPG, PNG\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"https://sv1.picz.in.th/images/2022/09/20/pzSz1I.png\"},{\"hashID\":\"ar9faqi\",\"title\":\"ทะเบียนบ้าน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf\"},{\"hashID\":\"ug0yjnz\",\"title\":\"เกรดเฉลี่ยสะสม\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf\"}]', '[{\"hashID\":\"k688e29\",\"title\":\"เกณฑที่ 1\",\"type\":\"score10\",\"weight\":\"70\"},{\"hashID\":\"gtibb7f\",\"title\":\"เกณฑที่ 2\",\"type\":\"score10\",\"weight\":\"30\"}]', ''),
(6, 3, 2, '{\"name\":\"บุญเขต คล้ายทอง\",\"yearofstudy\":\"\",\"birth_date\":\"2000-09-15\",\"std_id\":\"6230300559\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"หอ\",\"tel\":\"0936718664\",\"name_father\":\"ประคอง คล้ายทอง\",\"age_father\":\"60\",\"career_father\":\"ค้าขาย\",\"income_father\":\"55523\",\"address_father\":\"ห้องนอนที่บ้าน\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"บ้าน\",\"tel_father\":\"11111111111\",\"name_mother\":\"แม่\",\"age_mother\":\"52\",\"career_mother\":\"ไม่ทำอะไร\",\"income_mother\":\"256265\",\"address_mother\":\"ห้องนอนตรงจ้ามห้องพ่อ\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"บ้าน\",\"tel_mother\":\"2222222222\",\"status_marry\":\"หย่าร้าง\",\"gpa\":\"3.00\"}', 2, '[{\"hashID\":\"f3do9lf\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"\"}]', '', 'อายุไม่ถึงปีอีควาย'),
(7, 4, 6, '{\"name\":\"กิตติธัช เชื้อเงิน\",\"yearofstudy\":\"\",\"birth_date\":\"2001-07-27\",\"std_id\":\"6230300109\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"TEST\",\"tel\":\"0804966252\",\"name_father\":\"TEST\",\"age_father\":\"20\",\"career_father\":\"TEST\",\"income_father\":\"5000\",\"address_father\":\"TEST\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"TEST\",\"tel_father\":\"0804966252\",\"name_mother\":\"TEST\",\"age_mother\":\"50\",\"career_mother\":\"TEST\",\"income_mother\":\"5000\",\"address_mother\":\"TEST\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"TEST\",\"tel_mother\":\"0804966252\",\"status_marry\":\"อยู่ด้วยกัน\",\"gpa\":\"3.00\"}', 2, '[{\"hashID\":\"satybsw\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf\"}]', '', ''),
(8, 5, 4, '{\"name\":\"ตี้อะไร\",\"yearofstudy\":\"\",\"birth_date\":\"2000-08-12\",\"std_id\":\"6230300354\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมเครื่องกลและการออกแบบ (T13)\",\"address\":\"546\",\"tel\":\"546\",\"name_father\":\"546\",\"age_father\":\"456\",\"career_father\":\"5\",\"income_father\":\"5\",\"address_father\":\"5\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"5\",\"tel_father\":\"5\",\"name_mother\":\"5\",\"age_mother\":\"5\",\"career_mother\":\"5\",\"income_mother\":\"5\",\"address_mother\":\"5\",\"status_mother\":\"ถึงแก่กรรม\",\"place_of_work_mother\":\"5\",\"tel_mother\":\"5\",\"status_marry\":\"หย่าร้าง\",\"gpa\":\"3.96\"}', 2, '[{\"hashID\":\"satybsw\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"\"}]', '', ''),
(9, 6, 1, '{\"name\":\" chpmint\",\"yearofstudy\":\"\",\"birth_date\":\"2001-04-24\",\"std_id\":\"6230300231\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"799/72\",\"tel\":\"0987712345\",\"name_father\":\"สมศักดิ์ ปาณะวีระ\",\"age_father\":\"43\",\"career_father\":\"รับจ้าง\",\"income_father\":\"245\",\"address_father\":\"ึึ799/72\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"ไม่บอก\",\"tel_father\":\" 098123456\",\"name_mother\":\"สมหญิง ปาณะวีระ\",\"age_mother\":\"42\",\"career_mother\":\"แม่บ้าน\",\"income_mother\":\"2\",\"address_mother\":\"799/72\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"ไม่บอก\",\"tel_mother\":\"0918761234\",\"status_marry\":\"อยู่ด้วยกัน\",\"gpa\":\"4.00\"}', 1, '[{\"hashID\":\"satybsw\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf\"},{\"hashID\":\"bgehmwc\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf\"}]', '', ''),
(10, 8, 6, '{\"name\":\"กษิดิ์เดช สูตรประจัน\",\"yearofstudy\":\"\",\"birth_date\":\"2000-12-28\",\"std_id\":\"6230300043\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"บ้านกูเอง\",\"tel\":\"0645534631\",\"name_father\":\"แจจจ้\",\"age_father\":\"7\",\"career_father\":\"กดหกด\",\"income_father\":\"120264\",\"address_father\":\"บ้านพ่อกูเอง\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"กดฟหกดหก\",\"tel_father\":\"065448\",\"name_mother\":\"ออออออ\",\"age_mother\":\"58\",\"career_mother\":\"หกดห\",\"income_mother\":\"11538963\",\"address_mother\":\"บ้านข้างๆพ่อกูเอง\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"รพ\",\"tel_mother\":\"0636636\",\"status_marry\":\"แยกกันอยู่\",\"gpa\":\"4.00\"}', 2, '[{\"hashID\":\"satybsw\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"\"}]', '', ''),
(11, 8, 3, '{\"name\":\"กษิดิ์เดช สูตรประจัน\",\"yearofstudy\":\"\",\"birth_date\":\"2000-12-28\",\"std_id\":\"6230300043\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"บ้านกูเอง\",\"tel\":\"0645534631\",\"name_father\":\"แจจจ้\",\"age_father\":\"7\",\"career_father\":\"กดหกด\",\"income_father\":\"120264\",\"address_father\":\"บ้านพ่อกูเอง\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"กดฟหกดหก\",\"tel_father\":\"065448\",\"name_mother\":\"ออออออ\",\"age_mother\":\"58\",\"career_mother\":\"หกดห\",\"income_mother\":\"11538963\",\"address_mother\":\"บ้านข้างๆพ่อกูเอง\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"รพ\",\"tel_mother\":\"0636636\",\"status_marry\":\"แยกกันอยู่\",\"gpa\":\"4.00\"}', 1, '[{\"hashID\":\"3r3b4ud\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"DOCX, DOC\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"\"}]', '', ''),
(12, 10, 1, '{\"name\":\"เบล\",\"yearofstudy\":\"\",\"birth_date\":\"2022-04-07\",\"std_id\":\"6230300427\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"41/41 \",\"tel\":\"0909202140\",\"name_father\":\"บี\",\"age_father\":\"16\",\"career_father\":\"เรียน\",\"income_father\":\"15000\",\"address_father\":\"44\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"รร.\",\"tel_father\":\"08524455221\",\"name_mother\":\"เอ\",\"age_mother\":\"18\",\"career_mother\":\"เรียน\",\"income_mother\":\"20000\",\"address_mother\":\"44\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"รร.\",\"tel_mother\":\"0852236655\",\"status_marry\":\"อยู่ด้วยกัน\",\"gpa\":\"4.00\"}', 0, '[{\"hashID\":\"bm1jb2b\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"\"}]', '', ''),
(13, 10, 5, '{\"name\":\"เบล\",\"yearofstudy\":\"\",\"birth_date\":\"2022-04-07\",\"std_id\":\"6230300427\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"41/41 \",\"tel\":\"0909202140\",\"name_father\":\"บี\",\"age_father\":\"16\",\"career_father\":\"เรียน\",\"income_father\":\"15000\",\"address_father\":\"44\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"รร.\",\"tel_father\":\"08524455221\",\"name_mother\":\"เอ\",\"age_mother\":\"18\",\"career_mother\":\"เรียน\",\"income_mother\":\"20000\",\"address_mother\":\"44\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"รร.\",\"tel_mother\":\"0852236655\",\"status_marry\":\"อยู่ด้วยกัน\",\"gpa\":\"4.00\"}', 9, '[{\"hashID\":\"fc8dsvg\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\",\"url\":\"\"}]', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `profile_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`profile_data`)),
  `picture_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `user_id`, `profile_data`, `picture_data`) VALUES
(1, 1, '{\"name\":\"ธนธรณ์ บุญประเสริฐ\",\"yearofstudy\":\"\",\"age\":\"0023-12-31\",\"std_id\":\"6230300419\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"146/17 จังหวัดระยอง\",\"tel\":\"0998895368\",\"name_father\":\"คุณพ่อ บิดา\",\"age_father\":\"50\",\"career_father\":\"ราชการ\",\"income_father\":\"30000\",\"address_father\":\"155/33 จังหวัดระยอง\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"โรงพัก\",\"tel_father\":\"0999999999\",\"name_mother\":\"คุณแม่ มารดา\",\"age_mother\":\"40\",\"career_mother\":\"ธุรกิจส่วนตัว\",\"income_mother\":\"20000\",\"address_mother\":\"66/44 จังหวัดระยอง\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"บ้าน\",\"tel_mother\":\"0888899999\",\"status_marry\":\"หย่าร้าง\",\"gpa\":\"2.7\",\"birth_date\":\"2001-01-16\",\"image\":\"https://sv1.picz.in.th/images/2022/09/20/pz7gVR.jpg\"}', 'https://sv1.picz.in.th/images/2022/09/20/pzSz1I.png'),
(2, 2, '{\"name\":\"จักรพงษ์\",\"yearofstudy\":\"\",\"birth_date\":\"2000-06-23\",\"std_id\":\"6230301130\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"140\",\"tel\":\"0641150359\",\"name_father\":\"เสรี\",\"age_father\":\"60\",\"career_father\":\"บรื้่น\",\"income_father\":\"12\",\"address_father\":\"กทม\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"กทม\",\"tel_father\":\"0641150359\",\"name_mother\":\"จันทร์สวาท เกษร\",\"age_mother\":\"50\",\"career_mother\":\"บักๆๆ\",\"income_mother\":\"12\",\"address_mother\":\"ปทม\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"ปทม\",\"tel_mother\":\"0641150359\",\"status_marry\":\"อยู่ด้วยกัน\",\"gpa\":\"2.00\"}', 'https://sv1.picz.in.th/images/2022/09/20/pzSz1I.png'),
(3, 3, '{\"name\":\"บุญเขต คล้ายทอง\",\"yearofstudy\":\"\",\"birth_date\":\"2000-09-15\",\"std_id\":\"6230300559\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"หอ\",\"tel\":\"0936718664\",\"name_father\":\"ประคอง คล้ายทอง\",\"age_father\":\"60\",\"career_father\":\"ค้าขาย\",\"income_father\":\"55523\",\"address_father\":\"ห้องนอนที่บ้าน\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"บ้าน\",\"tel_father\":\"11111111111\",\"name_mother\":\"แม่\",\"age_mother\":\"52\",\"career_mother\":\"ไม่ทำอะไร\",\"income_mother\":\"256265\",\"address_mother\":\"ห้องนอนตรงจ้ามห้องพ่อ\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"บ้าน\",\"tel_mother\":\"2222222222\",\"status_marry\":\"หย่าร้าง\",\"gpa\":\"2.00\"}', 'https://sv1.picz.in.th/images/2022/09/20/pzSz1I.png'),
(4, 4, '{\"name\":\"กิตติธัช เชื้อเงิน\",\"yearofstudy\":\"\",\"birth_date\":\"2001-07-27\",\"std_id\":\"6230300109\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"TEST\",\"tel\":\"0804966252\",\"name_father\":\"TEST\",\"age_father\":\"20\",\"career_father\":\"TEST\",\"income_father\":\"5000\",\"address_father\":\"TEST\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"TEST\",\"tel_father\":\"0804966252\",\"name_mother\":\"TEST\",\"age_mother\":\"50\",\"career_mother\":\"TEST\",\"income_mother\":\"5000\",\"address_mother\":\"TEST\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"TEST\",\"tel_mother\":\"0804966252\",\"status_marry\":\"อยู่ด้วยกัน\",\"gpa\":\"3.00\"}', 'https://sv1.picz.in.th/images/2022/09/20/pzSz1I.png'),
(5, 5, '{\"name\":\"ตี้\",\"yearofstudy\":\"\",\"birth_date\":\"2000-08-12\",\"std_id\":\"6230300354\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมเครื่องกลและการออกแบบ (T13)\",\"address\":\"546\",\"tel\":\"546\",\"name_father\":\"546\",\"age_father\":\"456\",\"career_father\":\"5\",\"income_father\":\"5\",\"address_father\":\"5\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"5\",\"tel_father\":\"5\",\"name_mother\":\"5\",\"age_mother\":\"5\",\"career_mother\":\"5\",\"income_mother\":\"5\",\"address_mother\":\"5\",\"status_mother\":\"ถึงแก่กรรม\",\"place_of_work_mother\":\"5\",\"tel_mother\":\"5\",\"status_marry\":\"หย่าร้าง\",\"gpa\":\"3.96\"}', 'https://sv1.picz.in.th/images/2022/09/20/pzSz1I.png'),
(6, 6, '{\"name\":\" chpmint\",\"yearofstudy\":\"\",\"birth_date\":\"2001-04-24\",\"std_id\":\"6230300231\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"799/72\",\"tel\":\"0987712345\",\"name_father\":\"สมศักดิ์ ปาณะวีระ\",\"age_father\":\"43\",\"career_father\":\"รับจ้าง\",\"income_father\":\"245\",\"address_father\":\"ึึ799/72\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"ไม่บอก\",\"tel_father\":\" 098123456\",\"name_mother\":\"สมหญิง ปาณะวีระ\",\"age_mother\":\"42\",\"career_mother\":\"แม่บ้าน\",\"income_mother\":\"2\",\"address_mother\":\"799/72\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"ไม่บอก\",\"tel_mother\":\"0918761234\",\"status_marry\":\"อยู่ด้วยกัน\",\"gpa\":\"4.00\"}', 'https://sv1.picz.in.th/images/2022/09/20/pzSz1I.png'),
(7, 7, '{\"name\":\"บิ๊ก\",\"yearofstudy\":\"\",\"birth_date\":\"2018-01-11\",\"std_id\":\"6230300168\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมอุตสาหการ (T07)\",\"address\":\"อยู่บ้าน\",\"tel\":\"09471851222\",\"name_father\":\"ทร\",\"age_father\":\"10\",\"career_father\":\"เรื่องของพ่อ\",\"income_father\":\"99999\",\"address_father\":\"-\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"-\",\"tel_father\":\"-\",\"name_mother\":\"คร\",\"age_mother\":\"20\",\"career_mother\":\"-\",\"income_mother\":\"100000\",\"address_mother\":\"-\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"-\",\"tel_mother\":\"-\",\"status_marry\":\"อยู่ด้วยกัน\",\"gpa\":\"3.00\"}', 'https://sv1.picz.in.th/images/2022/09/20/pzSz1I.png'),
(8, 8, '{\"name\":\"กษิดิ์เดช สูตรประจัน\",\"yearofstudy\":\"\",\"birth_date\":\"2000-12-28\",\"std_id\":\"6230300043\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"บ้านกูเอง\",\"tel\":\"0645534631\",\"name_father\":\"แจจจ้\",\"age_father\":\"7\",\"career_father\":\"กดหกด\",\"income_father\":\"120264\",\"address_father\":\"บ้านพ่อกูเอง\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"กดฟหกดหก\",\"tel_father\":\"065448\",\"name_mother\":\"ออออออ\",\"age_mother\":\"58\",\"career_mother\":\"หกดห\",\"income_mother\":\"11538963\",\"address_mother\":\"บ้านข้างๆพ่อกูเอง\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"รพ\",\"tel_mother\":\"0636636\",\"status_marry\":\"แยกกันอยู่\",\"gpa\":\"4.00\"}', 'https://sv1.picz.in.th/images/2022/09/20/pzSz1I.png'),
(9, 9, '{\"name\":\"ดวงพร โนนไกร\",\"yearofstudy\":\"\",\"birth_date\":\"2020-08-10\",\"std_id\":\"6230300389\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"1\",\"tel\":\"1\",\"name_father\":\"1\",\"age_father\":\"1\",\"career_father\":\"1\",\"income_father\":\"1\",\"address_father\":\"1\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"1\",\"tel_father\":\"1\",\"name_mother\":\"1\",\"age_mother\":\"1\",\"career_mother\":\"1\",\"income_mother\":\"1\",\"address_mother\":\"1\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"1\",\"tel_mother\":\"1\",\"status_marry\":\"อยู่ด้วยกัน\",\"gpa\":\"3\"}', 'https://sv1.picz.in.th/images/2022/09/20/pzSz1I.png'),
(10, 10, '{\"name\":\"เบล\",\"yearofstudy\":\"\",\"birth_date\":\"2022-04-07\",\"std_id\":\"6230300427\",\"fieldStudy\":\"ภาคปกติ\",\"branch\":\"วิศวกรรมคอมพิวเตอร์และสารสนเทศศาสตร์ (T12)\",\"address\":\"41/41 \",\"tel\":\"0909202140\",\"name_father\":\"บี\",\"age_father\":\"16\",\"career_father\":\"เรียน\",\"income_father\":\"15000\",\"address_father\":\"44\",\"status_father\":\"ยังมีชีวิตอยู่\",\"place_of_work_father\":\"รร.\",\"tel_father\":\"08524455221\",\"name_mother\":\"เอ\",\"age_mother\":\"18\",\"career_mother\":\"เรียน\",\"income_mother\":\"20000\",\"address_mother\":\"44\",\"status_mother\":\"ยังมีชีวิตอยู่\",\"place_of_work_mother\":\"รร.\",\"tel_mother\":\"0852236655\",\"status_marry\":\"\",\"gpa\":\"4.00\"}', 'https://sv1.picz.in.th/images/2022/09/20/pzSz1I.png');

-- --------------------------------------------------------

--
-- Table structure for table `scholarship`
--

CREATE TABLE `scholarship` (
  `id` int(11) NOT NULL,
  `donator_id` int(255) NOT NULL,
  `status` int(11) NOT NULL,
  `type` varchar(500) NOT NULL,
  `detail` varchar(500) NOT NULL,
  `amount` int(255) NOT NULL,
  `on_year` int(11) NOT NULL,
  `on_term` varchar(500) NOT NULL,
  `open_date` date NOT NULL,
  `close_date` date NOT NULL,
  `attribute_requirement` longtext NOT NULL,
  `file_requirement` longtext NOT NULL,
  `interview_requirement` longtext NOT NULL,
  `appointment` longtext DEFAULT NULL,
  `interviewer` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `scholarship`
--

INSERT INTO `scholarship` (`id`, `donator_id`, `status`, `type`, `detail`, `amount`, `on_year`, `on_term`, `open_date`, `close_date`, `attribute_requirement`, `file_requirement`, `interview_requirement`, `appointment`, `interviewer`) VALUES
(1, 1, 1, 'ทุนขาดคุณทรัพย์', 'หากปัญหาในการสมัคร \nกรุณาติดต่อ งานกิจการนิสิต \nโทร. 0 3835 4580  \nemail : eng.src.ku.ac.th', 15000, 2563, 'ภาคปลาย', '2022-04-09', '2022-04-10', '{\"min_gpa\":\"2.5\",\"min_nisit_id\":\"57\",\"max_nisit_id\":\"65\"}', '[{\"hashID\":\"bm1jb2b\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\"},{\"hashID\":\"u8nwuim\",\"title\":\"ทะเบียนบ้าน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\"}]', '[{\"hashID\":\"qzftfeo\",\"title\":\"เอกสารครบหรือไม่\",\"type\":\"score100\",\"weight\":\"100\"}]', '{\"date\":\"2022-04-13\",\"time\":\"11:31\",\"meet_code\":\"dsf๓๔๒๑\",\"meet_link\":\"google.com\"}', '[]'),
(2, 2, 1, 'ทุนกิจกรรมเด่น', 'หากปัญหาในการสมัคร \nกรุณาติดต่อ งานกิจการนิสิต \nโทร. 0 3835 4580  \nemail : eng.src.ku.ac.th', 24, 2563, 'ภาคต้น', '2022-04-09', '2022-04-30', '{\"min_gpa\":\"2.5\",\"min_nisit_id\":\"57\",\"max_nisit_id\":\"65\"}', '[{\"hashID\":\"ld3o935\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\"}]', '[{\"hashID\":\"ktb3h9d\",\"title\":\"เอกสารครบหรือไม่\",\"type\":\"score100\",\"weight\":\"50\"},{\"hashID\":\"6vit3rg\",\"title\":\"กิจกรรมเด่นหรือไม่\",\"type\":\"score100\",\"weight\":\"10\"},{\"hashID\":\"y26tyxy\",\"title\":\"TEST\",\"type\":\"state\",\"weight\":\"50\"}]', '{\"date\":\"2022-04-09\",\"time\":\"23:39\",\"meet_code\":\"cmYk2k2Y\",\"meet_link\":\"google.com\"}', '[]'),
(3, 3, 1, 'ทุนขาดคุณทรัพย์', 'หากปัญหาในการสมัคร \nกรุณาติดต่อ งานกิจการนิสิต \nโทร. 0 3835 4580  \nemail : eng.src.ku.ac.th', 15000, 2565, 'ภาคปลาย', '2022-04-10', '2022-04-16', '{\"min_gpa\":\"3.00\",\"min_nisit_id\":\"58\",\"max_nisit_id\":\"65\"}', '[{\"hashID\":\"nd44rnf\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\"}]', '[{\"hashID\":\"13iypbm\",\"title\":\"เอกสารครบหรือไม่\",\"type\":\"state\",\"weight\":\"10\"}]', '{\"date\":\"2022-04-13\",\"time\":\"14:17\",\"meet_code\":\"RX1QW2ดดด\",\"meet_link\":\"https://meet.google.com/RX1QW\"}', '[{\"hashID\":\"x9j6dvy\",\"id\":\"\",\"email\":\"\"}]'),
(4, 4, 1, 'ทุนแบบเด่นๆ', 'อร่อยๆ', 20000, 2564, 'ภาคต้น', '2022-04-12', '2022-04-14', '{\"min_gpa\":\"3\",\"min_nisit_id\":\"60\",\"max_nisit_id\":\"62\"}', '[{\"hashID\":\"ds3xxx5\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\"}]', '[{\"hashID\":\"gsfzsbg\",\"title\":\"คะแนนสบั้ม\",\"type\":\"score100\",\"weight\":\"100\"}]', NULL, '[]'),
(5, 5, 1, 'ทุน 20000', 'ทุนประจำปี 65', 20000, 2565, 'ภาคต้น', '2022-04-11', '2022-04-25', '{\"min_gpa\":\"3\",\"min_nisit_id\":\"60\",\"max_nisit_id\":\"64\"}', '[{\"hashID\":\"satybsw\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\"},{\"hashID\":\"bjlz6gs\",\"title\":\"เกรดเฉลี่ยสะสม\",\"format\":\"DOCX, DOC\",\"isTyping\":false,\"customTitle\":\"เรียงความ\"},{\"hashID\":\"1741c52\",\"title\":\"รูปบ้าน\",\"format\":\"JPG, PNG\",\"isTyping\":false,\"customTitle\":\"\"},{\"hashID\":\"bgehmwc\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"PDF\",\"isTyping\":false,\"customTitle\":\"\"}]', '[{\"hashID\":\"re8j44y\",\"title\":\"ความสามารถ\",\"type\":\"score100\",\"weight\":\"50\"},{\"hashID\":\"orklmb2\",\"title\":\"บุคลิก\",\"type\":\"score10\",\"weight\":\"50\"},{\"hashID\":\"b8xuwml\",\"title\":\"สถานะทางบ้านขาดแคลนจริง\",\"type\":\"state\",\"weight\":\"100\"}]', NULL, '[{\"hashID\":\"dsghv24\",\"id\":2,\"email\":\"chakkapong.s@ku.th\"}]'),
(6, 1, 1, 'ทุน SE', 'SE Scholarship 2565', 55000, 2565, 'ภาคต้น', '2022-04-01', '2022-04-30', '{\"min_gpa\":\"2.00\",\"min_nisit_id\":\"60\",\"max_nisit_id\":\"65\"}', '[{\"hashID\":\"px8uupo\",\"title\":\"สำเนาบัตรประชาชน\",\"format\":\"JPG, PNG\",\"isTyping\":false,\"customTitle\":\"\"}]', '[{\"hashID\":\"k688e29\",\"title\":\"เกณฑที่ 1\",\"type\":\"score10\",\"weight\":\"70\"},{\"hashID\":\"gtibb7f\",\"title\":\"เกณฑที่ 2\",\"type\":\"score10\",\"weight\":\"30\"}]', '{\"date\":\"2022-04-11\",\"time\":\"09:39\",\"meet_code\":\"x45xgxdf\",\"meet_link\":\"google.com\"}', '[{\"hashID\":\"l8h7886\",\"id\":2,\"email\":\"chakkapong.s@ku.th\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fname` varchar(500) NOT NULL,
  `lname` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `role` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fname`, `lname`, `email`, `role`) VALUES
(1, 'Tanathon', 'Boonpasert', 'tanatorn.bo@ku.th', 'student'),
(2, 'Chakkapong', 'Singsee', 'chakkapong.s@ku.th', 'interviewer'),
(3, 'Bunyakhet', 'Klaithong', 'bunyakhet.k@ku.th', 'admin'),
(4, 'Kittitus', 'Chueangoen', 'kittitus.c@ku.th', 'student'),
(5, 'Natdanai', 'Krairod', 'natdanai.kra@ku.th', 'admin'),
(6, 'Chonthicha', 'Panaweera', 'chonthicha.pana@ku.th', 'admin'),
(7, 'Jakkrit', 'Jhunnark', 'jakkrit.jh@ku.th', 'admin'),
(8, 'Kasidath', 'Sutprajun', 'kasidath.s@ku.th', 'interviewer'),
(9, 'Doungphorn', 'Nonkai', 'doungphorn.n@ku.th', 'admin'),
(10, 'Thanaporn', 'Tanrueksthaporn', 'thanaporn.tanr@ku.th', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announce`
--
ALTER TABLE `announce`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donator`
--
ALTER TABLE `donator`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `form`
--
ALTER TABLE `form`
  ADD PRIMARY KEY (`id`),
  ADD KEY `scholarship_id` (`scholarship_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `scholarship`
--
ALTER TABLE `scholarship`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donator_id` (`donator_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announce`
--
ALTER TABLE `announce`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `donator`
--
ALTER TABLE `donator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `form`
--
ALTER TABLE `form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1223;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `scholarship`
--
ALTER TABLE `scholarship`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `form`
--
ALTER TABLE `form`
  ADD CONSTRAINT `form_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
