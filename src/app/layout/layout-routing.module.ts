import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
      { path: 'wishlist', loadChildren: () => import('./wishlist/wishlist.module').then(m => m.WishlistModule) },
      { path:'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)},
      { path: 'contact', loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule) },
      { path: 'about', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
      { path: 'faq', loadChildren: () => import('./faqs/faqs.module').then(m => m.FaqsModule) },
      { path: 'blogs', loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule) },
      { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      { path: 'all-collections', loadChildren: () => import('./all-collections/all-collections.module').then(m => m.AllCollectionsModule) },
      { path: 'profile' , loadChildren : () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)},
      { path: 'privacy' , loadChildren : () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)},
      { path: 'refund-returns', loadChildren: () => import('./refund-returns/refund-returns.module').then(m => m.RefundReturnsModule)},
      { path: 'orders-returns', loadChildren: () => import('./orders-returns/orders-returns.module').then(m => m.OrdersReturnsModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
