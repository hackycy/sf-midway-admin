define({ "api": [
  {
    "type": "get",
    "url": "/admin/sys/task/info",
    "title": "获取任务信息",
    "group": "任务调度",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>任务编号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "SysTask",
            "optional": false,
            "field": "data",
            "description": "<p>任务列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/task.ts",
    "groupTitle": "任务调度",
    "name": "GetAdminSysTaskInfo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/task-log/page",
    "title": "获取任务日志列表",
    "group": "任务调度",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "SysTaskLog[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>任务日志列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.page",
            "description": "<p>当前页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.size",
            "description": "<p>限制个数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.total",
            "description": "<p>总数量</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/task_log.ts",
    "groupTitle": "任务调度",
    "name": "GetAdminSysTaskLogPage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/task/page",
    "title": "获取任务列表",
    "group": "任务调度",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "SysTask[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>任务列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.page",
            "description": "<p>当前页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.size",
            "description": "<p>限制个数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.total",
            "description": "<p>总数量</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/task.ts",
    "groupTitle": "任务调度",
    "name": "GetAdminSysTaskPage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/task/add",
    "title": "新增任务",
    "group": "任务调度",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>任务名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "service",
            "description": "<p>调用服务路径</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>任务类型</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>任务状态</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "startTime",
            "description": "<p>启动时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endTime",
            "description": "<p>启动时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>最大运行次数，小于等于0则不限次数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cron",
            "description": "<p>cron表达式</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "every",
            "description": "<p>间隔时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>运行参数，JSON格式的字符串</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>任务备注</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/task.ts",
    "groupTitle": "任务调度",
    "name": "PostAdminSysTaskAdd",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/task/delete",
    "title": "删除任务",
    "group": "任务调度",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>任务编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/task.ts",
    "groupTitle": "任务调度",
    "name": "PostAdminSysTaskDelete",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/task/once",
    "title": "手动执行一次任务",
    "group": "任务调度",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>任务编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/task.ts",
    "groupTitle": "任务调度",
    "name": "PostAdminSysTaskOnce",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/task/start",
    "title": "启动任务",
    "group": "任务调度",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>任务编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/task.ts",
    "groupTitle": "任务调度",
    "name": "PostAdminSysTaskStart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/task/stop",
    "title": "停止任务",
    "group": "任务调度",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>任务编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/task.ts",
    "groupTitle": "任务调度",
    "name": "PostAdminSysTaskStop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/task/update",
    "title": "更新任务",
    "group": "任务调度",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>任务名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "service",
            "description": "<p>调用服务路径</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>任务类型</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>任务状态</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "startTime",
            "description": "<p>启动时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endTime",
            "description": "<p>启动时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>最大运行次数，小于等于0则不限次数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cron",
            "description": "<p>cron表达式</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "every",
            "description": "<p>间隔时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>运行参数，JSON格式的字符串</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>任务备注</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>任务编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/task.ts",
    "groupTitle": "任务调度",
    "name": "PostAdminSysTaskUpdate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/space/image/page",
    "title": "获取图片信息列表",
    "group": "图片空间",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "typeId",
            "description": "<p>类别编号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ImageSpaceInfo[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>图片信息列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.page",
            "description": "<p>当前页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.size",
            "description": "<p>限制个数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.total",
            "description": "<p>总数量</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/space/image.ts",
    "groupTitle": "图片空间",
    "name": "GetAdminSpaceImagePage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/space/image/type/list",
    "title": "获取图片空间类别列表",
    "group": "图片空间",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>图片空间类别列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/space/image.ts",
    "groupTitle": "图片空间",
    "name": "GetAdminSpaceImageTypeList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/space/image/delete",
    "title": "删除空间类别下的图片列表",
    "group": "图片空间",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "imageIds",
            "description": "<p>图片ID列表</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/space/image.ts",
    "groupTitle": "图片空间",
    "name": "PostAdminSpaceImageDelete",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/space/image/type/add",
    "title": "新增图片空间类别",
    "group": "图片空间",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>类别名称</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/space/image.ts",
    "groupTitle": "图片空间",
    "name": "PostAdminSpaceImageTypeAdd",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/space/image/type/delete",
    "title": "删除图片空间类别",
    "group": "图片空间",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "typeId",
            "description": "<p>类别编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/space/image.ts",
    "groupTitle": "图片空间",
    "name": "PostAdminSpaceImageTypeDelete",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/space/image/upload",
    "title": "图片上传(表单)",
    "group": "图片空间",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "typeId",
            "description": "<p>图片ID列表</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/space/image.ts",
    "groupTitle": "图片空间",
    "name": "PostAdminSpaceImageUpload",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/online/list",
    "title": "获取在线用户列表",
    "group": "在线用户",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.ip",
            "description": "<p>用户登陆IP</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.isCurrent",
            "description": "<p>是否为当前用户</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.time",
            "description": "<p>登陆时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.status",
            "description": "<p>状态</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.os",
            "description": "<p>登陆系统</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.browser",
            "description": "<p>登陆浏览器</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.disable",
            "description": "<p>是否可用</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/online.ts",
    "groupTitle": "在线用户",
    "name": "GetAdminSysOnlineList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/online/list",
    "title": "下线当前用户",
    "group": "在线用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>当前用户ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/online.ts",
    "groupTitle": "在线用户",
    "name": "GetAdminSysOnlineList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/login-log/page",
    "title": "获取登录日志列表",
    "group": "登录日志",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "SysLoginLog[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>登录日志列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.page",
            "description": "<p>当前页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.size",
            "description": "<p>限制个数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.total",
            "description": "<p>总数量</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/login_log.ts",
    "groupTitle": "登录日志",
    "name": "GetAdminSysLoginLogPage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/captcha/img",
    "title": "获取图片验证码",
    "group": "登陆验证类",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "width",
            "defaultValue": "100",
            "description": "<p>图片宽度</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "height",
            "defaultValue": "50",
            "description": "<p>图片高度</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.img",
            "description": "<p>base64格式的验证码图片字符串</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": "<p>验证码对应ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/comm/login.ts",
    "groupTitle": "登陆验证类",
    "name": "GetAdminCaptchaImg",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/permmenu",
    "title": "获取权限及菜单",
    "group": "登陆验证类",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.menus",
            "description": "<p>菜单</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.perms",
            "description": "<p>权限描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/comm/login.ts",
    "groupTitle": "登陆验证类",
    "name": "GetAdminPermmenu",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/person",
    "title": "获取当前登录用户信息",
    "group": "登陆验证类",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>管理员信息实体类</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/comm/login.ts",
    "groupTitle": "登陆验证类",
    "name": "GetAdminPerson",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/login",
    "title": "管理员登陆",
    "group": "登陆验证类",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名，AES加密</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码，AES加密</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "captchaId",
            "description": "<p>验证码ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "verifyCode",
            "description": "<p>填写的验证码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.token",
            "description": "<p>用户Token</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/comm/login.ts",
    "groupTitle": "登陆验证类",
    "name": "PostAdminLogin"
  },
  {
    "type": "post",
    "url": "/admin/logout",
    "title": "管理员登出",
    "group": "登陆验证类",
    "version": "0.0.0",
    "filename": "app/controller/admin/comm/login.ts",
    "groupTitle": "登陆验证类",
    "name": "PostAdminLogout",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/person",
    "title": "更新管理员信息",
    "group": "登陆验证类",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nickName",
            "description": "<p>别名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "originPassword",
            "description": "<p>更改前密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>新密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>备注</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "headImg",
            "description": "<p>头像</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/comm/login.ts",
    "groupTitle": "登陆验证类",
    "name": "PostAdminPerson",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/user/page",
    "title": "获取系统用户列表",
    "group": "系统用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "departmentId",
            "description": "<p>部门编号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "SysUser[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>用户列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.page",
            "description": "<p>当前页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.size",
            "description": "<p>限制个数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.total",
            "description": "<p>总数量</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/user.ts",
    "groupTitle": "系统用户",
    "name": "GetAdminSysUserPage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/user/add",
    "title": "新增系统用户",
    "group": "系统用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "departmentId",
            "description": "<p>部门编号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>管理员名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nickName",
            "description": "<p>别名</p>"
          },
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "roles",
            "description": "<p>关联角色编号列表，最多三个</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>用户备注</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/user.ts",
    "groupTitle": "系统用户",
    "name": "PostAdminSysUserAdd",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.list",
            "description": "<p>查询数据列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.page",
            "description": "<p>当前页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.size",
            "description": "<p>限制个数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.total",
            "description": "<p>总数量</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/user/delete",
    "title": "删除用户列表",
    "group": "系统用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "userIds",
            "description": "<p>用户编号列表</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "SysUser",
            "optional": false,
            "field": "data",
            "description": "<p>用户列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.list",
            "description": "<p>查询数据列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.page",
            "description": "<p>当前页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.size",
            "description": "<p>限制个数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.total",
            "description": "<p>总数量</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/user.ts",
    "groupTitle": "系统用户",
    "name": "PostAdminSysUserDelete",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/user/info",
    "title": "获取系统用户信息",
    "group": "系统用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>用户编号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "SysUser",
            "optional": false,
            "field": "data",
            "description": "<p>用户列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.list",
            "description": "<p>查询数据列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.page",
            "description": "<p>当前页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.size",
            "description": "<p>限制个数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.total",
            "description": "<p>总数量</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/user.ts",
    "groupTitle": "系统用户",
    "name": "PostAdminSysUserInfo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/user/update",
    "title": "更新系统用户信息",
    "group": "系统用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "departmentId",
            "description": "<p>部门编号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>管理员名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nickName",
            "description": "<p>别名</p>"
          },
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "roles",
            "description": "<p>关联角色编号列表，最多三个</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>用户备注</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>用户编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/user.ts",
    "groupTitle": "系统用户",
    "name": "PostAdminSysUserUpdate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.list",
            "description": "<p>查询数据列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.page",
            "description": "<p>当前页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.size",
            "description": "<p>限制个数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.total",
            "description": "<p>总数量</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/menu/info",
    "title": "获取菜单信息",
    "group": "系统菜单",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "menuId",
            "description": "<p>菜单编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/menu.ts",
    "groupTitle": "系统菜单",
    "name": "GetAdminSysMenuInfo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/menu/list",
    "title": "获取所有菜单",
    "group": "系统菜单",
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/menu.ts",
    "groupTitle": "系统菜单",
    "name": "GetAdminSysMenuList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/menu/add",
    "title": "增加菜单",
    "group": "系统菜单",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>菜单类别</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parentId",
            "description": "<p>父级菜单，无则为-1</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>菜单名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "orderNum",
            "description": "<p>排序</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "router",
            "description": "<p>路由地址</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isShow",
            "description": "<p>是否显示</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "keepalive",
            "description": "<p>开启keepalive</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "icon",
            "description": "<p>对应svg图标文件名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "perms",
            "description": "<p>权限</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "viewPath",
            "description": "<p>vue文件路径</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/menu.ts",
    "groupTitle": "系统菜单",
    "name": "PostAdminSysMenuAdd",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/menu/delete",
    "title": "删除菜单",
    "group": "系统菜单",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "menuId",
            "description": "<p>菜单编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/menu.ts",
    "groupTitle": "系统菜单",
    "name": "PostAdminSysMenuDelete",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/menu/update",
    "title": "更新菜单",
    "group": "系统菜单",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>菜单类别</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parentId",
            "description": "<p>父级菜单，无则为-1</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>菜单名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "orderNum",
            "description": "<p>排序</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "router",
            "description": "<p>路由地址</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isShow",
            "description": "<p>是否显示</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "keepalive",
            "description": "<p>开启keepalive</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "icon",
            "description": "<p>对应svg图标文件名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "perms",
            "description": "<p>权限</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "viewPath",
            "description": "<p>vue文件路径</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "menuId",
            "description": "<p>菜单编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/menu.ts",
    "groupTitle": "系统菜单",
    "name": "PostAdminSysMenuUpdate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/role/list",
    "title": "获取全部系统角色列表",
    "group": "系统角色",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "SysRole[]",
            "optional": false,
            "field": "data",
            "description": "<p>角色列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/role.ts",
    "groupTitle": "系统角色",
    "name": "GetAdminSysRoleList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/role/list",
    "title": "获取全部系统角色列表",
    "group": "系统角色",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "SysRole",
            "optional": false,
            "field": "data",
            "description": "<p>角色信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/role.ts",
    "groupTitle": "系统角色",
    "name": "GetAdminSysRoleList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/role/page",
    "title": "获取系统角色列表",
    "group": "系统角色",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "SysRole[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>角色列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.page",
            "description": "<p>当前页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.size",
            "description": "<p>限制个数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.total",
            "description": "<p>总数量</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/role.ts",
    "groupTitle": "系统角色",
    "name": "GetAdminSysRolePage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/role/add",
    "title": "新增角色",
    "group": "系统角色",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>角色名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>角色表示</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>备注</p>"
          },
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "menus",
            "description": "<p>关联菜单ID列表</p>"
          },
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "depts",
            "description": "<p>关联部门ID列表</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/role.ts",
    "groupTitle": "系统角色",
    "name": "PostAdminSysRoleAdd",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/role/delete",
    "title": "删除角色",
    "group": "系统角色",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "roleIds",
            "description": "<p>角色编号列表</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/role.ts",
    "groupTitle": "系统角色",
    "name": "PostAdminSysRoleDelete",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/role/update",
    "title": "更新角色",
    "group": "系统角色",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>角色名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>角色表示</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>备注</p>"
          },
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "menus",
            "description": "<p>关联菜单ID列表</p>"
          },
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "depts",
            "description": "<p>关联部门ID列表</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "roleId",
            "description": "<p>角色编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/role.ts",
    "groupTitle": "系统角色",
    "name": "PostAdminSysRoleUpdate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/dept/info",
    "title": "获取部门信息",
    "group": "系统部门",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "departmentId",
            "description": "<p>部门编号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "SysDepartment",
            "optional": false,
            "field": "data",
            "description": "<p>部门信息实体</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/dept.ts",
    "groupTitle": "系统部门",
    "name": "GetAdminSysDeptInfo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/dept/list",
    "title": "获取部门列表",
    "group": "系统部门",
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/dept.ts",
    "groupTitle": "系统部门",
    "name": "GetAdminSysDeptList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/dept/add",
    "title": "增加部门",
    "group": "系统部门",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parentDepartmentId",
            "description": "<p>父级部门编号，没有则为-1</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "departmentName",
            "description": "<p>部门名称</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/dept.ts",
    "groupTitle": "系统部门",
    "name": "PostAdminSysDeptAdd",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/dept/delete",
    "title": "删除部门",
    "group": "系统部门",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "departmentId",
            "description": "<p>部门编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/dept.ts",
    "groupTitle": "系统部门",
    "name": "PostAdminSysDeptDelete",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/dept/transfer",
    "title": "人员部门转移",
    "group": "系统部门",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": false,
            "field": "userIds",
            "description": "<p>管理员编号列表</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "departmentId",
            "description": "<p>需要转移去的部门编号</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/dept.ts",
    "groupTitle": "系统部门",
    "name": "PostAdminSysDeptTransfer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/admin/sys/dept/update",
    "title": "获取部门信息",
    "group": "系统部门",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>部门编号</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parentId",
            "description": "<p>父级部门编号，没有则为-1</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>部门名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "orderNum",
            "description": "<p>排序</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/dept.ts",
    "groupTitle": "系统部门",
    "name": "PostAdminSysDeptUpdate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/req-log/page",
    "title": "获取请求追踪列表",
    "group": "请求追踪",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "SysReqLog[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>请求追踪列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.pagination",
            "description": "<p>分页信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.page",
            "description": "<p>当前页数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.size",
            "description": "<p>限制个数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.pagination.total",
            "description": "<p>总数量</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/req_log.ts",
    "groupTitle": "请求追踪",
    "name": "GetAdminSysReqLogPage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/admin/sys/req-log/search",
    "title": "请求追踪搜索",
    "group": "请求追踪",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "q",
            "description": "<p>条件</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/admin/sys/req_log.ts",
    "groupTitle": "请求追踪",
    "name": "GetAdminSysReqLogSearch",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>管理员登陆Token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码，成功则返回200</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息，成功则返回success</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>返回的数据</p>"
          }
        ]
      }
    }
  }
] });
