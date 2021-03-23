import { res, resByPage } from '../common/utils';

// swagger doc example define

export const NormalExample = res();

//--------------------------------------------------login

export const GetLoginImgCaptchaExample = res({
  data: {
    img: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDxxx',
    id: 'bfMpheAIqp4ah0QhMEomT',
  },
});

export const GetLoginTokenExample = res({
  data: { token: 'eyJhbGciOiJIUzI1NiI....' },
});

export const GetPermMenuExample = res({
  data: {
    menus: [
      {
        createTime: '2020-08-28T10:09:26.322Z',
        updateTime: '2020-10-12T06:35:18.000Z',
        id: 1,
        parentId: null,
        name: '系统',
        router: '/sys',
        perms: null,
        type: 0,
        icon: 'system',
        orderNum: 255,
        viewPath: null,
        keepalive: true,
        isShow: true,
      },
    ],
    perms: ['sys:user:add', 'sys:user:delete'],
  },
});

export const GetAdminPersonInfoExample = res({
  data: {
    createTime: '2020-08-27T03:38:30.000Z',
    updateTime: '2020-10-07T07:17:14.000Z',
    id: 1,
    name: 'hackycy',
    username: 'rootadmin',
    psalt: 'adsbadwasasdwasdasd',
    nickName: '',
    headImg: 'http://xxx.png',
    email: 'qa894178522@qq.com',
    phone: '13124314551',
    remark: null,
  },
});

//--------------------------------------------------dept

export const GetListDeptExample = res({
  data: [
    {
      createTime: '2020-08-27T03:33:19.000Z',
      updateTime: '2020-08-27T03:33:19.000Z',
      id: 1,
      parentId: 2,
      name: '思忆技术',
      orderNum: 0,
    },
  ],
});

export const GetInfoDeptExample = res({
  data: {
    department: {
      createTime: '2020-09-08T05:31:32.426Z',
      updateTime: '2020-10-07T04:25:31.000Z',
      id: 2,
      parentId: 1,
      name: 'xxx部门',
      orderNum: 0,
    },
    parentDepartment: {
      createTime: '2020-08-27T03:33:19.000Z',
      updateTime: '2020-08-27T03:33:19.000Z',
      id: 1,
      parentId: null,
      name: 'xxx部门',
      orderNum: 0,
    },
  },
});

//--------------------------------------------------log

export const GetLoginLogByPageExample = resByPage(
  [
    {
      id: 3,
      ip: '127.0.0.1',
      os: 'undefined undefined',
      browser: 'undefined undefined',
      time: '2021-03-22T02:28:16.836Z',
      username: 'rootadmin',
    },
  ],
  1,
  1,
  10
);

export const GetReqLogByPageExample = resByPage(
  [
    {
      createTime: '2021-03-22T08:27:13.506Z',
      updateTime: '2021-03-22T08:27:13.506Z',
      id: 1,
      ip: '127.0.0.1',
      userId: 1,
      params: '{}',
      action: '/admin/captcha/img',
      method: 'GET',
      status: 200,
      consumeTime: 11,
    },
  ],
  1,
  1,
  10
);

export const SearchReqLogByPageExample = resByPage(
  [
    {
      createTime: '2021-03-22T08:27:13.506Z',
      updateTime: '2021-03-22T08:27:13.506Z',
      id: 1,
      ip: '127.0.0.1',
      userId: 1,
      params: '{}',
      action: '/admin/captcha/img',
      method: 'GET',
      status: 200,
      consumeTime: 11,
    },
  ],
  1,
  1,
  10
);

export const GetTaskLogByPageExample = resByPage(
  [
    {
      id: 3,
      taskId: 2,
      name: '日志名称',
      createTime: '2021-03-22T08:27:13.506Z',
      finishTime: '2021-03-22T08:27:13.506Z',
      detail: '任务执行详情',
      status: 1,
    },
  ],
  1,
  1,
  10
);

//--------------------------------------------------role

export const GetRoleListExample = res({
  data: [
    {
      createTime: '2020-09-14T07:39:02.423Z',
      updateTime: '2020-10-13T07:29:33.000Z',
      id: 2,
      userId: '1',
      name: '测试角色',
      label: 'testrole',
      remark: '',
    },
  ],
});

export const GetRoleListByPageExample = resByPage(
  [
    {
      createTime: '2020-09-14T07:39:02.423Z',
      updateTime: '2020-10-13T07:29:33.000Z',
      id: 2,
      userId: '1',
      name: '测试角色',
      label: 'testrole',
      remark: '',
    },
  ],
  1,
  1,
  10
);

export const GetRoleInfoExample = res({
  data: {
    roleInfo: {
      createTime: '2020-09-14T07:39:02.423Z',
      updateTime: '2020-10-13T07:29:33.000Z',
      id: 2,
      userId: '1',
      name: '测试角色',
      label: 'testrole',
      remark: '',
    },
    menus: [
      {
        createTime: '2020-09-14T07:39:02.432Z',
        updateTime: '2020-09-14T07:39:02.432Z',
        id: 1,
        roleId: 2,
        menuId: 44,
      },
    ],
    depts: [
      {
        createTime: '2020-09-14T07:39:02.445Z',
        updateTime: '2020-09-14T07:39:02.445Z',
        id: 1,
        roleId: 2,
        departmentId: 1,
      },
    ],
  },
});

//--------------------------------------------------user

export const GetAdminUserInfoExample = res({
  data: {
    createTime: '2020-08-27T03:38:30.000Z',
    updateTime: '2021-03-18T10:18:20.000Z',
    id: 1,
    departmentId: 2,
    name: 'xxx',
    username: 'root',
    psalt: 'xxxxxxxxxxx',
    nickName: '',
    headImg: 'http://xxx.png',
    email: 'xxx@qq.com',
    phone: '1562xxx2415',
    remark: null,
    status: 1,
    roles: [1],
    departmentName: '管理部门',
  },
});

export const GetUserInDeptByPageExample = res({
  data: {
    list: [
      {
        createTime: '2020-09-14T07:41:33.732Z',
        departmentId: 2,
        email: 'xxxxx@qq.com',
        headImg: '',
        id: 2,
        name: 'xxxx',
        nickName: '',
        phone: '',
        remark: '',
        status: 0,
        updateTime: '2021-03-18T10:18:20.000Z',
        username: 'xxx001',
        departmentName: '管理部门',
      },
    ],
    pagination: {
      total: 2,
      page: 1,
      size: 10,
    },
  },
});

//--------------------------------------------------online

export const GetOnlineAdminListExample = res({
  data: {
    id: 1,
    ip: '127.0.0.1',
    username: 'rootadmin',
    isCurrent: true,
    time: '2021-03-23T02:32:15.396Z',
    status: 1,
    os: 'undefined undefined',
    browser: 'undefined undefined',
    disable: true,
  },
});
