import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from, of, Subject } from 'rxjs';
import { filter, finalize, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-auto-search-component',
    templateUrl: './auto-search-component.component.html',
    styleUrls: ['./auto-search-component.component.css']
})
export class AutoSearchComponentComponent implements OnInit, OnDestroy {

    constructor() {
    }
    unsubscribe$ = new Subject<void>();

    options = [
        { id: 1, label: 'One' },
        { id: 2, label: 'Two', name: 'Two', },
        { id: 3, label: 'Three', name: 'One', mall: { contain : { name: 'Mall' } }, }
    ];
    options2 = [
        {
          "id":1,
          "name":"평양냉면",
          "category":"음식",
          "content":"메밀 함량이 높은 면발이 매력 넘치는 인덴트 평양 냉면",
          "tags":[
            "냉면",
            "한식",
            "호불호"
          ],
          "mall":{
            "name":"인덴트 평양냉면",
            "category":"식당",
            "location":{
              "name":"주소",
              "content":"서울시 특별시 영구 오동동"
            },
            "tags":[
              "가성비",
              "양많음",
              "김치강추"
            ]
          },
          "reviewer":{
            "name":"너구리"
          },
          "score":4,
          "parking":{
            "content":"식사 시 30분 무료",
            "fee":{
              "unit":"5m",
              "amount":500
            }
          },
          "related":null
        },
        {
          "id":2,
          "name":"마샬라짜이",
          "category":"음료",
          "content":"홍차에 인도 향신료가 들어간 독특한 밀크티. 파이와 참 어울림",
          "tags":[
            "짜이",
            "밀크티",
            "향신료"
          ],
          "mall":{
            "name":"nopesan",
            "category":"까페",
            "location":{
              "name":"주소",
              "content":"서울몇시 맹구 성수동"
            },
            "tags":[
              "작음",
              "힙스터",
              "얼음맛집"
            ]
          },
          "reviewer":{
            "name":"프레지던트YS"
          },
          "score":4.5,
          "parking":{
            "content":"드라이브 스루",
            "fee":null
          },
          "related":null
        },
        {
          "id":3,
          "name":"파이 참",
          "category":"디저트",
          "content":"복숭아로 만든 파이",
          "tags":[
            "파이",
            "복숭아",
            "piecharm"
          ],
          "mall":{
            "name":"휘도 판 디저트 인덴트점",
            "category":"디저트",
            "location":{
              "name":"홈페이지",
              "content":"https://indentcorp.com"
            },
            "tags":[
              "파이",
              "뱀",
              "복숭아"
            ]
          },
          "reviewer":{
            "name":"테크데니"
          },
          "score":4.7,
          "parking":{
            "content":"근처 민영주차장",
            "fee":{
              "unit":"5m",
              "amount":1000
            }
          }
        },
        {
          "id":4,
          "name":"들기름 막국수",
          "category":"음식",
          "content":"들기름 막국수가 가장 유명한 막국수집",
          "tags":[
            "막국수",
            "한식",
            "메밀",
            "들기름"
          ],
          "mall":{
            "name":"고기 리 막국수",
            "category":"식당",
            "location":{
              "name":"주소",
              "content":"경기도 특별시 멀구 기다리"
            },
            "tags":[
              "대기열",
              "국수",
              "막국수"
            ]
          },
          "reviewer":{
            "name":"Kayos"
          },
          "score":4.9,
          "parking":{
            "content":"자체 주차장",
            "fee":{
              "unit":null,
              "amount":0
            }
          },
          "related":[
            {
              "id":1,
              "name":"평양냉면",
              "category":"음식",
              "tags":[
                "슴슴",
                "메밀",
                "감칠맛"
              ]
            },
            {
              "id":15,
              "name":"막국수",
              "category":"음식",
              "tags":[
                "메밀"
              ]
            }
          ]
        }
    ]
    control = new FormControl();

    // Variable for Searching with query
    searchResults = {
      keyword : [],
      category : {},
      blog : [],
    };

    results: any[] = [];

    queryRecommendsResults = [];
    relatedCategories:any = [];

    keywordIndexing:any;
	  keywordIndexingParent:any;
	  keywordIndexingArray:any;

    keywordIndexingObj: any;

    ngOnInit(): void {
        let result = [];
        console.log('[autocomplete ngOnInit]')
        this.makeInitialSearchData();
    }

    makeInitialSearchData() {
      from(this.options2).pipe(
        switchMap(option => {
          let result = [];
          const value = this.getObject2(result, option);
          console.log('value', value);
          from(value).pipe(
            map(res => {
              this.results.push({ id: option.id, name: option.name, category: option.category, query: res });
            })
          ).subscribe()
          return this.results;
        }),
        finalize(() => console.log(this.results))
      ).subscribe(res => {
        // this.results.push({ id: res.option.id, query: res.value });
      })
    }

    getObject2(result, node) {
      const keys = Object.keys(node);
      
      for(let i=0; i<keys.length; i++) {
        if (!!node[keys[i]] && keys[i] !== 'tags' && typeof(node[keys[i]]) === 'object') {
          this.getObject2(result, node[keys[i]]);
        }

        if (keys[i] === 'name' || keys[i] === 'category' || keys[i] === 'content' || keys[i] === 'tags') {
          if(keys[i] === 'tags') {
            for(let tag of node[keys[i]]) {
              result.push(tag);
            }
          } else {
            result.push(node[keys[i]]);
          }
        }
      }

      return result;
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
