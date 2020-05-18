-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-05-2020 a las 06:25:24
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_pedidos`
--

CREATE TABLE `detalles_pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_plato` int(11) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `impuesto` decimal(3,1) NOT NULL,
  `neto` decimal(65,2) NOT NULL,
  `total` decimal(65,2) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalles_pedidos`
--

INSERT INTO `detalles_pedidos` (`id_pedido`, `id_plato`, `cantidad`, `impuesto`, `neto`, `total`, `fecha_registro`, `fecha_actualizacion`) VALUES
(1, 1, 2, '0.0', '24000.00', '24000.00', '2020-05-10 23:53:51', '0000-00-00 00:00:00'),
(2, 1, 2, '0.0', '100000.00', '100000.00', '2020-05-18 01:33:52', '0000-00-00 00:00:00'),
(2, 1, 2, '0.0', '100000.00', '100000.00', '2020-05-18 01:34:05', '0000-00-00 00:00:00'),
(2, 5, 1, '0.0', '0.00', '0.00', '2020-05-18 01:36:01', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_pedidos`
--

CREATE TABLE `estados_pedidos` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estados_pedidos`
--

INSERT INTO `estados_pedidos` (`id`, `descripcion`, `fecha_creacion`) VALUES
(1, 'Nuevo', '2020-05-10 23:15:41'),
(2, 'Confimado', '2020-05-10 23:15:41'),
(3, 'Preparando', '2020-05-10 23:16:01'),
(4, 'Enviado', '2020-05-10 23:16:01'),
(5, 'Cancelado', '2020-05-10 23:16:15'),
(6, 'Entregado', '2020-05-10 23:16:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formas_de_pago`
--

CREATE TABLE `formas_de_pago` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `formas_de_pago`
--

INSERT INTO `formas_de_pago` (`id`, `descripcion`, `fecha_registro`) VALUES
(1, 'Efectivo', '2020-05-09 03:57:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_forma_pago` int(11) NOT NULL,
  `valor_pedido` decimal(65,2) NOT NULL COMMENT 'equivale al pago total por pedido',
  `id_estado` int(11) NOT NULL COMMENT '1=nuevo, 2=confimado, 3=preparando, 4=enviado, 5=cancelado, 6= entregado',
  `observacion` varchar(255) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `id_usuario`, `id_forma_pago`, `valor_pedido`, `id_estado`, `observacion`, `fecha_registro`, `fecha_actualizacion`) VALUES
(1, 1, 1, '24000.00', 1, '', '2020-05-10 23:52:43', '2020-05-10 18:52:43'),
(2, 5, 1, '100000.00', 1, 'sin salsas', '2020-05-18 01:31:00', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles`
--

CREATE TABLE `perfiles` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `perfiles`
--

INSERT INTO `perfiles` (`id`, `descripcion`, `fecha_creacion`) VALUES
(1, 'Administrador', '2020-05-10 23:49:36'),
(2, 'Cliente', '2020-05-10 23:49:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platos`
--

CREATE TABLE `platos` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `descripcion_abreviada` varchar(100) NOT NULL,
  `precio` decimal(65,2) NOT NULL,
  `descuento` decimal(3,1) NOT NULL,
  `img` text NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `platos`
--

INSERT INTO `platos` (`id`, `descripcion`, `descripcion_abreviada`, `precio`, `descuento`, `img`, `fecha_registro`) VALUES
(1, 'Hamburguesa Clásica', 'HamClas', '12000.00', '0.0', '', '2020-05-09 18:50:10'),
(5, 'Pizza Clasica', 'PizClas', '10000.00', '0.0', 'http://localhost/img/3.jpg', '2020-05-16 22:51:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `nombre_completo` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` decimal(65,0) NOT NULL,
  `clave` varchar(50) NOT NULL,
  `id_perfil` int(11) NOT NULL COMMENT '1=Administrador, 2=Especial, 3=Cliente',
  `estado` tinyint(1) NOT NULL COMMENT '1 = activo, 2 = inactivo',
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `nombre_completo`, `direccion`, `correo`, `telefono`, `clave`, `id_perfil`, `estado`, `fecha_registro`) VALUES
(1, 'helmer90', 'Helmer Villarreal', 'calle 50 # 20', 'helmervillarreal@gmail.com', '6202280', 'helmer90', 1, 1, '2020-05-10 23:51:12'),
(2, 'pedro', 'Pedro ruiz', 'calle 50 #', 'helmer@gmial.com', '2147483647', 'pedro', 2, 1, '2020-05-16 21:15:45'),
(5, 'juan', 'Juan perez', 'calle 50 #', 'helmer@gmial.com', '3203415931', 'juan', 2, 1, '2020-05-16 22:47:51');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalles_pedidos`
--
ALTER TABLE `detalles_pedidos`
  ADD KEY `fk_plato` (`id_plato`) USING BTREE,
  ADD KEY `fk_pedido` (`id_pedido`) USING BTREE;

--
-- Indices de la tabla `estados_pedidos`
--
ALTER TABLE `estados_pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `formas_de_pago`
--
ALTER TABLE `formas_de_pago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario` (`id_usuario`),
  ADD KEY `fk_forma_Pago` (`id_forma_pago`),
  ADD KEY `fk_id_estado` (`id_estado`) USING BTREE;

--
-- Indices de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `platos`
--
ALTER TABLE `platos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_perfil` (`id_perfil`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estados_pedidos`
--
ALTER TABLE `estados_pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `formas_de_pago`
--
ALTER TABLE `formas_de_pago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `platos`
--
ALTER TABLE `platos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles_pedidos`
--
ALTER TABLE `detalles_pedidos`
  ADD CONSTRAINT `relacion_pedidos_detalles` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relacion_platos_detalles` FOREIGN KEY (`id_plato`) REFERENCES `platos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `relacion_estados_pedidos` FOREIGN KEY (`id_estado`) REFERENCES `estados_pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relacion_formasPago_pedidos` FOREIGN KEY (`id_forma_pago`) REFERENCES `formas_de_pago` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relacion_usuarios_pedidos` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `relacion_perfiles_usuarios` FOREIGN KEY (`id_perfil`) REFERENCES `perfiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
