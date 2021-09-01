import { FilterPipe } from "./filer.pipe";

describe('filterPipe', () => {
    // 파이프는 순수 함수이며 스테이트도 없습니다. 따라서 BeforeEach는 필요 없습니다.
    const pipe = new FilterPipe();
  
    it('filter result exist', () => {
     
      const options = [
        {id: 1, name: "평양냉면", category: "음식", query: "평양냉면"},
        {id: 1, name: "평양냉면", category: "음식", query: "음식"},
        {id: 1, name: "평양냉면", category: "음식", query: "메밀 함량이 높은 면발이 매력 넘치는 인덴트 평양 냉면"},
        {id: 1, name: "평양냉면", category: "음식", query: "냉면"},
        {id: 1, name: "평양냉면", category: "음식", query: "슴슴"},
        {id: 1, name: "평양냉면", category: "음식", query: "호불호"},
        {id: 1, name: "평양냉면", category: "음식", query: "인덴트 평양냉면"},
        {id: 1, name: "평양냉면", category: "음식", query: "식당"}
      ];
  
      const filterText = '슴슴';
      const pipe = new FilterPipe();
      const result = pipe.transform(options, filterText);
      console.log('[result]: ', result);
      expect(result).toEqual([options[4]]);

    });

    it('filter result empty', () => {
     
        const options = [
          {id: 1, name: "평양냉면", category: "음식", query: "평양냉면"},
          {id: 1, name: "평양냉면", category: "음식", query: "음식"},
          {id: 1, name: "평양냉면", category: "음식", query: "메밀 함량이 높은 면발이 매력 넘치는 인덴트 평양 냉면"},
          {id: 1, name: "평양냉면", category: "음식", query: "냉면"},
          {id: 1, name: "평양냉면", category: "음식", query: "바보"},
          {id: 1, name: "평양냉면", category: "음식", query: "호불호"},
          {id: 1, name: "평양냉면", category: "음식", query: "인덴트 평양냉면"},
          {id: 1, name: "평양냉면", category: "음식", query: "식당"}
        ];
    
        const filterText = '슴슴';
        const pipe = new FilterPipe();
        const result = pipe.transform(options, filterText);
        console.log('[result]: ', result);
        expect(result).toEqual([]);
  
      });

      
});