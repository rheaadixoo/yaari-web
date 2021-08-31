import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { CollectionsService } from 'src/app/shared/services/collections.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import * as _ from "lodash";
@Component({
  selector: 'yaari-category-menu-bar',
  templateUrl: './category-menu-bar.component.html',
  styleUrls: ['./category-menu-bar.component.scss']
})
export class CategoryMenuBarComponent implements OnInit {
  public collections: any = [];
  public categories: any = [];
  public hoveredItemId: number = 0;
  public Object = Object;
  constructor(private collectionService: CollectionsService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    // $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
    // $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
    // $(".menu > ul").before("<a href=\"#\" class=\"menu-mobile\">&nbsp;</a>");
    // $(".menu > ul > li").click(function () {
    //   if ($(window).width() <= 943) {
    //     $(this).children("ul").fadeToggle(150);
    //   }
    // });
    // $(".menu-mobile").click(function (e) {
    //   $(".menu > ul").toggleClass('show-on-mobile');
    //   e.preventDefault();
    // });
    this.getAllCollection();
    this.getAllCategory();
  }

  /**
   * 
   * @param id 
   */
  showCategoryDropdown(id) {
    this.hoveredItemId = id;
    document.getElementById('cat-' + id).style.display = 'block';
  }

  /**
   * 
   * @param id 
   */
  hideDropDown(id) {
    this.hoveredItemId = 0;
    document.getElementById('cat-' + id).style.display = 'none';
  }

  /**
   * 
   */
  getAllCollection() {
    this.collectionService.getAllCollections().subscribe(res => {
      this.collections = res;
    })
  }

  getCollections() {
    return this.collections.filter(x => x.name == 'Women' || x.name == 'Men' || x.name == 'Kids'
      || x.name == 'Beauty & Personal Care' || x.name == 'Home & Kitchen');
  }

  remainingCollections() {
    return this.collections.filter(x => x.name == 'Luggage & Trolleys' ||
      x.name == 'Electronics & Accessories' || x.name == 'Essentials')
  }
  /**
   * 
   */
  getAllCategory() {
    this.categoryService.getAllSubCategories().subscribe(res => {
      this.categories = _.groupBy(res, function (response) {
        if (response.category) {
          return response.category.name;
        }
      })
      try {
        // console.log("-----tgsu0000",this.categories);
        for (let keys in this.categories) {
          for (let item of this.categories[keys]) {
            if (item.category) {
              this.categories[keys]['collection_id'] = item.category.collectionId;
            }
          }
        }
      } catch (error) {
        console.log("error >>>>>>>>", error);

      }

    })

    // this.categoryService.getAllSubCategories().subscribe(resp => {
    //   console.log("resp-------", resp);
    // })
  }

  /**
   * 
  */
  showPagesDropdown(type) {
    if (type == 'others') {
      document.getElementById('collec_ul').style.display = 'block';
      document.getElementById('pages_ul').style.display = 'none';
    } else {
      document.getElementById('collec_ul').style.display = 'none';
      document.getElementById('pages_ul').style.display = 'block';
    }
  }

  /**
   * 
  */
  hidePagesDropDown(type) {
    if (type == 'others') {
      document.getElementById('collec_ul').style.display = 'none';
    } else {
      document.getElementById('pages_ul').style.display = 'none';
    }
  }

  /**
   * 
   * @returns 
   */
  returnZero() {
    return 0;
  }
}
