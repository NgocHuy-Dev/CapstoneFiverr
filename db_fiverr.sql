/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `BinhLuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_cong_viec` int DEFAULT NULL,
  `ma_nguoi_binh_luan` int DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ma_nguoi_binh_luan` (`ma_nguoi_binh_luan`),
  KEY `fk_id_cong_viec` (`id_cong_viec`),
  CONSTRAINT `fk_id_cong_viec` FOREIGN KEY (`id_cong_viec`) REFERENCES `CongViec` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ma_nguoi_binh_luan` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ChiTietLoaiCongViec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_chi_tiet_cv` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_loai_cong_viec` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ma_loai_cong_viec` (`ma_loai_cong_viec`),
  CONSTRAINT `fk_ma_loai_cong_viec` FOREIGN KEY (`ma_loai_cong_viec`) REFERENCES `LoaiCongViec` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `CongViec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_cong_viec` varchar(255) DEFAULT NULL,
  `danh_gia` float DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `mo_ta_ngan` varchar(255) DEFAULT NULL,
  `sao_cong_viec` int DEFAULT NULL,
  `ma_chi_tiet_loai` int DEFAULT NULL,
  `nguoi_tao` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_nguoi_tao` (`nguoi_tao`),
  KEY `fk_ma_chi_tiet_loai` (`ma_chi_tiet_loai`),
  CONSTRAINT `fk_ma_chi_tiet_loai` FOREIGN KEY (`ma_chi_tiet_loai`) REFERENCES `ChiTietLoaiCongViec` (`id`),
  CONSTRAINT `fk_nguoi_tao` FOREIGN KEY (`nguoi_tao`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LoaiCongViec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_loai_cong_viec` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=198908 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birth_day` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `skill` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `certification` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ThueCongViec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_cong_viec` int DEFAULT NULL,
  `ma_nguoi_thue` int DEFAULT NULL,
  `ngay_thue` datetime DEFAULT NULL,
  `hoan_thanh` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ma_nguoi_thue` (`ma_nguoi_thue`),
  KEY `fk_ma_cong_viec` (`ma_cong_viec`),
  CONSTRAINT `fk_ma_cong_viec` FOREIGN KEY (`ma_cong_viec`) REFERENCES `CongViec` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ma_nguoi_thue` FOREIGN KEY (`ma_nguoi_thue`) REFERENCES `NguoiDung` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`id`, `id_cong_viec`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(14, 12, 21, '2024-02-08 12:05:13', 'Code toàn bug', 1);


INSERT INTO `ChiTietLoaiCongViec` (`id`, `ten_chi_tiet_cv`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(1, 'Code không được có bug', 'hinh_anh_A.jpg', 1);
INSERT INTO `ChiTietLoaiCongViec` (`id`, `ten_chi_tiet_cv`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(2, 'lau nhà rửa bát', 'hinh_anh_B.jpg', 1);
INSERT INTO `ChiTietLoaiCongViec` (`id`, `ten_chi_tiet_cv`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(3, 'Chi tiết công việc C', 'hinh_anh_C.jpg', 1);
INSERT INTO `ChiTietLoaiCongViec` (`id`, `ten_chi_tiet_cv`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(4, 'Chi tiết công việc A', 'hinh_anh_A.jpg', 1),
(6, 'Chi tiết công việc C', 'hinh_anh_C.jpg', 1),
(7, 'Chi tiết công việc 1', 'hinh1.jpg', 1),
(8, 'Chi tiết công việc 2', 'hinh2.jpg', 1),
(11, 'Chi tiết công việc 5', 'hinh5.jpg', 3);

INSERT INTO `CongViec` (`id`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `nguoi_tao`) VALUES
(6, 'Chỉnh sửa công việc', 2, 111111, 'string', 'chỉnh sửa', 'sửa chữa', 3, 2, 20);
INSERT INTO `CongViec` (`id`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `nguoi_tao`) VALUES
(11, 'string', 0, 0, 'string', 'string', 'string', 5, 1, 2);
INSERT INTO `CongViec` (`id`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `nguoi_tao`) VALUES
(12, 'Lau nhà rửa bát', 5, 8888, 'string', 'Lau nhà trước rửa bát sau', 'lau, rửa', 4, 3, 18);
INSERT INTO `CongViec` (`id`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `nguoi_tao`) VALUES
(13, 'Lau nhà đón Tết', 5, 999, 'string', 'Lau không sạch mẹ la', 'lau thật sạch', 3, 2, 20);

INSERT INTO `LoaiCongViec` (`id`, `ten_loai_cong_viec`) VALUES
(1, 'Bán muối');
INSERT INTO `LoaiCongViec` (`id`, `ten_loai_cong_viec`) VALUES
(3, 'Loại công việc C');
INSERT INTO `LoaiCongViec` (`id`, `ten_loai_cong_viec`) VALUES
(4, 'Loại công việc 1');
INSERT INTO `LoaiCongViec` (`id`, `ten_loai_cong_viec`) VALUES
(5, 'Loại công việc 2'),
(6, 'Loại công việc 3'),
(198902, 'hehehehe'),
(198903, 'Làm mình làm mẩy'),
(198904, 'string'),
(198905, 'Bán thân cho tư bản'),
(198906, 'Nấu cơm'),
(198907, 'Bán thân cho tư bản');

INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`) VALUES
(2, 'Người dùng 1', 'user1@example.com', 'password1', '123456789', '1990-01-01', 'Male', '[\"Role1\"]', '[\"Skilll\"]', 'Certification1');
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`) VALUES
(3, 'Người dùng 2', 'user2@example.com', 'password2', '987654321', '1995-05-05', 'Female', '[\"Role1\"]', '[\"Skilll\"]', 'Certification2');
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`) VALUES
(4, 'Người dùng 3', 'user3@example.com', 'password3', '555666777', '1985-10-10', 'Male', '[\"Role1\"]', '[\"Skilll\"]', 'Certification3');
INSERT INTO `NguoiDung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`) VALUES
(9, 'string', 'string', 'string', 'string', 'string', 'true', '[\"Skilll\"]', '[\"Skilll\"]', 'string'),
(11, 'Huy hihi', 'huy@gmail.com', '11223344', '00998877', '20/01/1999', 'true', 'USER', 'code toàn bug', 'chúa tể tạo bug'),
(17, 'tên mới', 'stringhehehe', 'string', 'string', 'string', 'string', 'string', 'string', 'string'),
(18, 'Ngọc Huy', 'ngochuy@gmail.com', '$2b$10$WtvhxyrkGCHu7Aqk5Npsw.TfQoydlEgPKcIxkpVTjSlJeka.4Sep.', '998877', 'string', 'true', 'USER', 'string', 'string'),
(19, 'Ngọc Huy', 'hongochuy@gmail.com', '$2b$10$NeD4qS4F/44hLsRP3D/BMOMOjVx8zmsldA1WpT.RAXQnMz9xFhNVa', '0998877', 'string', 'true', 'USER', 'string', 'string'),
(20, 'string', 'stringg', '$2b$10$69eP1iV4PAat0sizpm8AmuxmvqhNYz5DmhwLNuNebe4g2R8xn3cdm', 'string', 'string', 'true', 'USER', 'string', 'string'),
(21, 'Têm mới cập nhật', 'ngochuyy@gmail.com', 'string', 'string', 'string', 'string', 'string', 'string', 'string'),
(22, 'Ngọc Huy Demo', 'ngochuyhihi@gmail.com', '$2b$10$VCAGEgFylvsdSnRu4OyW7.Tl.cZtFreZLiqj7Wo69Wg/s1cxiBn7q', 'string', 'string', 'true', 'USER', 'string', 'string');

INSERT INTO `ThueCongViec` (`id`, `ma_cong_viec`, `ma_nguoi_thue`, `ngay_thue`, `hoan_thanh`) VALUES
(11, 12, 17, '2024-01-02 14:30:00', 0);
INSERT INTO `ThueCongViec` (`id`, `ma_cong_viec`, `ma_nguoi_thue`, `ngay_thue`, `hoan_thanh`) VALUES
(12, 11, 18, '2024-01-03 09:15:00', 0);
INSERT INTO `ThueCongViec` (`id`, `ma_cong_viec`, `ma_nguoi_thue`, `ngay_thue`, `hoan_thanh`) VALUES
(14, 6, 19, '2024-02-08 12:21:23', 1);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;