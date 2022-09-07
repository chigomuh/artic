# Art Institute of Chicago

> 시카고 미술관의 작품들을 소개합니다.

## Demo

추가 예정

## 개발 중 막힘

### next/Image 사용 시 height 속성 auto 설정

> next/Image 사용 시 width, height 속성을 유동적으로 줄 수 없어 원본 비율과 맞지 않는 문제
> next/Image는 width와 height 속성을 이미지를 받기 전 고정적으로 부여 해야 함

#### 해결

```css
/* global.css */
/*
tailwind css를 사용 중이므로 global.css에 custom style을 작성 함

next/Image 구성
<span>
    <img />
</span>
*/

.ImageWrapper {
  width: 100%;
}

.ImageWrapper > span {
  position: unset !important;
}

.ImageWrapper > span > img {
  height: auto !important;
  position: relative !important;
}
```

```javascript
<div className="w-40">
    <div className="imageWrapper">
        <Image
            src="IMAGE_URL"
            layout="fill"
            ...
        />
    </div>
</div>
```

[참고](https://velog.io/@eunnbi/NextJS-Image-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)
