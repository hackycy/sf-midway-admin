-- `sf-admin`.image_space_info definition

CREATE TABLE `image_space_info` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL,
  `url` varchar(500) NOT NULL,
  `extra` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


-- `sf-admin`.image_space_type definition

CREATE TABLE `image_space_type` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_91decef4a2b88cb59caf658d44` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


-- `sf-admin`.sys_department definition

CREATE TABLE `sys_department` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parend_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `order_num` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


-- `sf-admin`.sys_login_log definition

CREATE TABLE `sys_login_log` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(20) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `ua` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;


-- `sf-admin`.sys_menu definition

CREATE TABLE `sys_menu` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `router` varchar(255) DEFAULT NULL,
  `perms` varchar(255) DEFAULT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '0',
  `icon` varchar(255) DEFAULT NULL,
  `order_num` int(11) DEFAULT '0',
  `view_path` varchar(255) DEFAULT NULL,
  `keepalive` tinyint(4) DEFAULT '1',
  `isShow` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4;


-- `sf-admin`.sys_req_log definition

CREATE TABLE `sys_req_log` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `params` text,
  `action` varchar(100) DEFAULT NULL,
  `method` varchar(15) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `consume_time` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4;


-- `sf-admin`.sys_role definition

CREATE TABLE `sys_role` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `label` varchar(50) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_223de54d6badbe43a5490450c3` (`name`),
  UNIQUE KEY `IDX_f2d07943355da93c3a8a1c411a` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


-- `sf-admin`.sys_role_department definition

CREATE TABLE `sys_role_department` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


-- `sf-admin`.sys_role_menu definition

CREATE TABLE `sys_role_menu` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;


-- `sf-admin`.sys_task definition

CREATE TABLE `sys_task` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `service` varchar(255) NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `limit` int(11) DEFAULT '0',
  `cron` varchar(255) DEFAULT NULL,
  `every` int(11) DEFAULT NULL,
  `data` text,
  `job_opts` text,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ef8e5ab5ef2fe0ddb1428439ef` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;


-- `sf-admin`.sys_task_log definition

CREATE TABLE `sys_task_log` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `detail` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- `sf-admin`.sys_user definition

CREATE TABLE `sys_user` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `head_img` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1',
  `psalt` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9e7164b2f1ea1348bc0eb0a7da` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;


-- `sf-admin`.sys_user_role definition

CREATE TABLE `sys_user_role` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
