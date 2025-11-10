import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidebar',
  imports: [ReactiveFormsModule, CommonModule, MenuModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
menuItems: MenuItem[] = [];

  constructor(private readonly router: Router) { }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dashboard',
      },
      {
        label: 'Khuôn mẫu',
        icon: '',
        items: [
          {
            label: 'Entity',
            icon: 'pi pi-database',
            routerLink: '/template/entity',
          },
          {
            label: 'Coding Conventions',
            icon: 'pi pi-code',
            routerLink: '/template/code',
          },
          // {
          //   label: 'Trả hàng/Hoàn tiền',
          //   icon: 'pi pi-undo',
          //   routerLink: '/sales/returns',
          // },
          // {
          //   label: 'Hóa đơn bán lẻ',
          //   icon: 'pi pi-file',
          //   routerLink: '/sales/invoices',
          // },
        ],
      },
      // {
      //   label: 'Quản lý sản phẩm',
      //   icon: 'pi pi-tags',
      //   items: [
      //     {
      //       label: 'Danh sách sản phẩm',
      //       icon: 'pi pi-box',
      //       routerLink: '/products/list',
      //     },
      //     {
      //       label: 'Danh mục sản phẩm',
      //       icon: 'pi pi-sitemap',
      //       routerLink: '/products/categories',
      //     },
      //     {
      //       label: 'Thương hiệu',
      //       icon: 'pi pi-briefcase',
      //       routerLink: '/products/brands',
      //     },
      //     {
      //       label: 'Thuộc tính sản phẩm',
      //       icon: 'pi pi-sliders-h',
      //       routerLink: '/products/attributes',
      //     },
      //   ],
      // },
      // {
      //   label: 'Quản lý kho',
      //   icon: 'pi pi-box',
      //   items: [
      //     {
      //       label: 'Nhập kho',
      //       icon: 'pi pi-sign-in',
      //       routerLink: '/inventory/import',
      //     },
      //     {
      //       label: 'Xuất kho',
      //       icon: 'pi pi-sign-out',
      //       routerLink: '/inventory/export',
      //     },
      //     {
      //       label: 'Kiểm kho',
      //       icon: 'pi pi-check-square',
      //       routerLink: '/inventory/check',
      //     },
      //     {
      //       label: 'Điều chuyển hàng',
      //       icon: 'pi pi-refresh',
      //       routerLink: '/inventory/transfer',
      //     },
      //     {
      //       label: 'Tồn kho',
      //       icon: 'pi pi-database',
      //       routerLink: '/inventory/stock',
      //     },
      //   ],
      // },
      // {
      //   label: 'Khách hàng',
      //   icon: 'pi pi-users',
      //   items: [
      //     {
      //       label: 'Danh sách khách hàng',
      //       icon: 'pi pi-user',
      //       routerLink: '/customers/list',
      //     },
      //     {
      //       label: 'Phân loại khách hàng',
      //       icon: 'pi pi-star',
      //       routerLink: '/customers/groups',
      //     },
      //     {
      //       label: 'Lịch sử mua hàng',
      //       icon: 'pi pi-history',
      //       routerLink: '/customers/history',
      //     },
      //     {
      //       label: 'Thành viên / Tích điểm',
      //       icon: 'pi pi-gift',
      //       routerLink: '/customers/loyalty',
      //     },
      //   ],
      // },
      // {
      //   label: 'Chi nhánh',
      //   icon: 'pi pi-building',
      //   items: [
      //     {
      //       label: 'Danh sách chi nhánh',
      //       icon: 'pi pi-map-marker',
      //       routerLink: '/branches/list',
      //     },
      //     {
      //       label: 'Tồn kho theo chi nhánh',
      //       icon: 'pi pi-warehouse',
      //       routerLink: '/branches/stock',
      //     },
      //     {
      //       label: 'Bán hàng theo chi nhánh',
      //       icon: 'pi pi-shopping-bag',
      //       routerLink: '/branches/sales',
      //     },
      //   ],
      // },
      // {
      //   label: 'Nhân viên & phân quyền',
      //   icon: 'pi pi-id-card',
      //   items: [
      //     {
      //       label: 'Danh sách nhân viên',
      //       icon: 'pi pi-user-edit',
      //       routerLink: '/staff/list',
      //     },
      //     {
      //       label: 'Phân quyền',
      //       icon: 'pi pi-lock',
      //       routerLink: '/staff/roles',
      //     },
      //     {
      //       label: 'Nhật ký hoạt động',
      //       icon: 'pi pi-calendar',
      //       routerLink: '/staff/audit-log',
      //     },
      //   ],
      // },
      // {
      //   label: 'Báo cáo',
      //   icon: 'pi pi-chart-line',
      //   items: [
      //     {
      //       label: 'Doanh thu',
      //       icon: 'pi pi-dollar',
      //       routerLink: '/reports/revenue',
      //     },
      //     {
      //       label: 'Sản phẩm bán chạy',
      //       icon: 'pi pi-chart-bar',
      //       routerLink: '/reports/top-products',
      //     },
      //     {
      //       label: 'Tồn kho',
      //       icon: 'pi pi-box',
      //       routerLink: '/reports/stock',
      //     },
      //     {
      //       label: 'Theo nhân viên',
      //       icon: 'pi pi-user',
      //       routerLink: '/reports/by-staff',
      //     },
      //   ],
      // },
      // {
      //   label: 'Cấu hình hệ thống',
      //   icon: 'pi pi-cog',
      //   items: [
      //     {
      //       label: 'Thông tin cửa hàng',
      //       icon: 'pi pi-info-circle',
      //       routerLink: '/settings/store',
      //     },
      //     {
      //       label: 'Thiết lập thuế/VAT',
      //       icon: 'pi pi-percentage',
      //       routerLink: '/settings/tax',
      //     },
      //     {
      //       label: 'Thiết lập tích điểm',
      //       icon: 'pi pi-gift',
      //       routerLink: '/settings/loyalty',
      //     },
      //     {
      //       label: 'Email/SMS Template',
      //       icon: 'pi pi-envelope',
      //       routerLink: '/settings/notification',
      //     },
      //   ],
      // },
      // {
      //   label: 'Tích hợp & kết nối',
      //   icon: 'pi pi-cloud',
      //   items: [
      //     {
      //       label: 'Kết nối phần mềm kế toán',
      //       icon: 'pi pi-database',
      //       routerLink: '/integrations/accounting',
      //     },
      //     {
      //       label: 'Đồng bộ website / sàn TMĐT',
      //       icon: 'pi pi-globe',
      //       routerLink: '/integrations/marketplace',
      //     },
      //     {
      //       label: 'API & Webhook',
      //       icon: 'pi pi-link',
      //       routerLink: '/integrations/api',
      //     },
      //   ],
      // },
      // {
      //   label: 'Tài khoản',
      //   icon: 'pi pi-user',
      //   items: [
      //     {
      //       label: 'Đổi mật khẩu',
      //       icon: 'pi pi-key',
      //       routerLink: '/account/change-password',
      //     },
      //     {
      //       label: 'Đăng xuất',
      //       icon: 'pi pi-sign-out',
      //       routerLink: '/logout',
      //     },
      //   ],
      // },
    ];

  }

  navigateTo(path: string) {
    this.router.navigate(['/workflow', path]);
  }
}
