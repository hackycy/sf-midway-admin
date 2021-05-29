import SysDepartment from '../../entity/admin/sys/department';
import SysMenu from '../../entity/admin/sys/menu';
import SysReqLog from '../../entity/admin/sys/req_log';
import SysRole from '../../entity/admin/sys/role';
import SysRoleDepartment from '../../entity/admin/sys/role_department';
import SysRoleMenu from '../../entity/admin/sys/role_menu';

export interface IImageCaptchaResult {
  img: string;
  id: string;
}

export interface IPermMenuResult {
  menus: SysMenu[];
  perms: string[];
}

export interface IMenuItemAndParentInfoResult {
  menu: SysMenu | undefined;
  parentMenu: SysMenu | undefined;
}

export interface ILoginLogResult {
  id: number;
  ip: string;
  os: string;
  browser: string;
  time: string;
  username: string;
}

export interface IRoleInfoResult {
  roleInfo: SysRole;
  menus: SysRoleMenu[];
  depts: SysRoleDepartment[];
}

export interface IAccountInfo {
  name: string;
  nickName: string;
  email: string;
  phone: string;
  remark: string;
  headImg: string;
}

export interface IAddRoleResult {
  roleId: number;
}

export interface IPageSearchUserResult {
  createTime: string;
  departmentId: number;
  email: string;
  headImg: string;
  id: number;
  name: string;
  nickName: string;
  phone: string;
  remark: string;
  status: number;
  updateTime: string;
  username: string;
  departmentName: string;
  roleNames: string[];
}

export interface IInfoDeptResult {
  department: SysDepartment | undefined;
  parentDepartment: SysDepartment | undefined;
}

export interface IOnlineInfoListResult {
  id: number;
  ip: string;
  username: string;
  isCurrent: boolean;
  time: string;
  status: number;
  os: string;
  browser: string;
  disable: boolean;
}

export interface IPageTaskLogResult {
  id: number;
  taskId: number;
  name: string;
  createTime: string;
  consumeTime: number;
  detail: string;
  status: number;
}

export interface IPageSearchReqLogResult {
  count: number;
  logs: SysReqLog[];
}

export type FileType = 'file' | 'dir';

export interface IFileListResult {
  list: IFileInfo[];
  marker?: string;
}

export interface IFileInfo {
  id: string;
  type: FileType;
  name: string;
  putTime?: Date;
  fsize?: string;
  mimeType?: string;
}

export interface IQiniuTaskStatusInfo {
  status: number;
  err?: string;
}
