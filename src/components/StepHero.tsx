import React from "react";

interface StepHeroProps {
  currentStep: 1 | 2 | 3 | 4;
}

export const StepHero: React.FC<StepHeroProps> = ({ currentStep }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "559px",
        flexShrink: 0,
        background: "#DBE3F3",
        position: "relative",
        overflow: "hidden",
        marginLeft: "1px",
      }}
    >
      {/* All decorative money images with responsive positioning */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/21152b892db88af7d842fb1f0ab43c37279ac217?width=83"
        style={{
          width: "41px",
          height: "67px",
          transform: "rotate(19.423deg)",
          flexShrink: 0,
          filter: "drop-shadow(6.059px 6.059px 0 rgba(0, 0, 0, 0.10))",
          position: "absolute",
          left: "min(1183px, calc(100vw - 100px))",
          top: "91px",
        }}
        alt="Group 108307"
      />
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/139db76d62eaa94384a77d83425e342c9b69e251?width=112"
        style={{
          width: "56px",
          height: "50px",
          transform: "rotate(12.955deg)",
          flexShrink: 0,
          filter: "drop-shadow(5.158px 5.158px 0 rgba(0, 0, 0, 0.10))",
          position: "absolute",
          left: "min(697px, calc(50vw - 28px))",
          top: "-19px",
        }}
        alt="Group 108295"
      />
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/c96432d3123f811e658ec681f96a2bbf37db4f8c?width=114"
        style={{
          width: "57px",
          height: "64px",
          transform: "rotate(21.992deg)",
          flexShrink: 0,
          filter: "drop-shadow(5.158px 5.158px 0 rgba(0, 0, 0, 0.10))",
          position: "absolute",
          left: "149px",
          top: "390px",
        }}
        alt="Group 108298"
      />
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/adb8b8f2eef317a18f28f55a48e863a6b0ef7f8c?width=113"
        style={{
          width: "57px",
          height: "59px",
          transform: "rotate(-13.296deg)",
          flexShrink: 0,
          filter: "drop-shadow(5.158px 5.158px 0 rgba(0, 0, 0, 0.10))",
          position: "absolute",
          left: "66px",
          top: "69px",
        }}
        alt="Group 108301"
      />
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/585b7adcaa2f0b3e2be960bf964bfbe086cfa99c?width=113"
        style={{
          width: "57px",
          height: "59px",
          transform: "rotate(-13.296deg)",
          flexShrink: 0,
          filter: "drop-shadow(5.158px 5.158px 0 rgba(0, 0, 0, 0.10))",
          position: "absolute",
          left: "min(1796px, calc(100vw - 80px))",
          top: "167px",
        }}
        alt="Group 108374"
      />
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/c9d95d6e00ec074dae4f160fcdaa4eabdf054470?width=115"
        style={{
          width: "57px",
          height: "71px",
          transform: "rotate(-33.253deg)",
          flexShrink: 0,
          filter: "drop-shadow(5.659px 5.659px 0 rgba(0, 0, 0, 0.10))",
          position: "absolute",
          left: "min(1690px, calc(100vw - 120px))",
          top: "344px",
        }}
        alt="Group 108292"
      />

      {/* Red stars */}
      <svg
        style={{
          width: "46px",
          height: "56px",
          flexShrink: 0,
          fill: "#E96036",
          strokeWidth: "9px",
          stroke: "#FFF",
          filter: "drop-shadow(10px 10px 0 rgba(0, 0, 0, 0.10))",
          position: "absolute",
          left: "min(1426px, calc(100vw - 80px))",
          top: "-22px",
        }}
        width="111"
        height="73"
        viewBox="0 0 111 73"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_224_68681)">
          <path
            d="M46.8821 -1.46424L53.3949 -21.9242L58.7205 -2.98501L74.7142 -8.32757L62.8419 6.48456L73.8153 19.8042L58.7205 15.9542L52.2246 34.311L46.2885 15.3605L33.2741 21.2798L42.4667 8.25976L28.8418 -8.59894L46.8821 -1.46424Z"
            fill="#E96036"
          />
          <path
            d="M57.7266 -23.142L61.7734 -8.75037L73.2881 -12.5961L87.7832 -17.4379L78.2256 -5.51306L68.6396 6.44592L77.2881 16.943L86.041 27.566L72.7031 24.1647L61.5908 21.3297L56.4668 35.8121L51.9648 48.5348L47.9307 35.6559L43.5156 21.5641L35.1367 25.3756L20.0186 32.2526L29.5977 18.6842L36.8281 8.44299L25.3418 -5.7699L14.5898 -19.0746L30.4971 -12.7836L44.0547 -7.42224L49.1064 -23.2894L53.6621 -37.599L57.7266 -23.142Z"
            stroke="white"
            strokeWidth="9"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_224_68681"
            x="0.337891"
            y="-53.2729"
            width="110.514"
            height="126.032"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="10" dy="10" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_224_68681"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_224_68681"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      <svg
        style={{
          width: "46px",
          height: "56px",
          flexShrink: 0,
          fill: "#E96036",
          strokeWidth: "9px",
          stroke: "#FFF",
          filter: "drop-shadow(10px 10px 0 rgba(0, 0, 0, 0.10))",
          position: "absolute",
          left: "0px",
          top: "280px",
        }}
        width="82"
        height="127"
        viewBox="0 0 82 127"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_224_68682)">
          <path
            d="M17.9368 51.96L24.4496 31.5L29.7752 50.4392L45.7689 45.0966L33.8966 59.9088L44.87 73.2284L29.7752 69.3783L23.2793 87.7352L17.3431 68.7847L4.32882 74.704L13.5214 61.684L-0.103516 44.8253L17.9368 51.96Z"
            fill="#E96036"
          />
          <path
            d="M28.7812 30.2822L32.8281 44.6738L44.3428 40.8281L58.8379 35.9863L49.2803 47.9111L39.6943 59.8701L48.3428 70.3672L57.0957 80.9902L43.7578 77.5889L32.6455 74.7539L27.5215 89.2363L23.0195 101.959L18.9854 89.0801L14.5703 74.9883L6.19141 78.7998L-8.92676 85.6768L0.652344 72.1084L7.88281 61.8672L-3.60352 47.6543L-14.3555 34.3496L1.55176 40.6406L15.1094 46.002L20.1611 30.1348L24.7168 15.8252L28.7812 30.2822Z"
            stroke="white"
            strokeWidth="9"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_224_68682"
            x="-28.6074"
            y="0.151245"
            width="110.514"
            height="126.032"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="10" dy="10" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_224_68682"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_224_68682"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      {/* Yellow stars */}
      <svg
        style={{
          width: "49px",
          height: "51px",
          flexShrink: 0,
          fill: "#FFEB77",
          strokeWidth: "9px",
          stroke: "#FFF",
          filter: "drop-shadow(10px 10px 0 rgba(0, 0, 0, 0.10))",
          position: "absolute",
          left: "min(1839px, calc(100vw - 60px))",
          top: "458px",
        }}
        width="78"
        height="80"
        viewBox="0 0 78 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_224_68683)">
          <path
            d="M34.0558 9.84825C33.9427 9.48077 33.4113 9.50339 33.3435 9.88217C32.4615 14.5576 29.7026 28.7818 28.9168 28.7818C27.9783 28.7818 7.91973 35.6734 9.80234 35.99C11.6849 36.3009 28.9168 39.122 28.9168 39.122C28.9168 39.122 35.4974 61.6851 34.8699 60.7466L39.8845 40.3771L58.4902 34.4861C58.835 34.3731 58.8237 33.8812 58.4732 33.7795L40.1955 28.1542L34.0558 9.84825Z"
            fill="#FFEB77"
          />
          <path
            d="M28.9219 9.04785C29.9103 3.72913 36.8585 4.02485 38.3203 8.41797L38.3223 8.41699L43.7266 24.5322L59.7969 29.4785L59.7959 29.4795C64.2057 30.8244 64.5432 37.2364 59.8926 38.7617L59.8701 38.7695L59.8486 38.7764L43.6494 43.9043L39.3857 61.2256C39.3507 61.5435 39.2718 61.965 39.0967 62.4111C38.9162 62.871 38.3285 64.1455 36.7959 64.8564C35.0643 65.6595 33.5136 65.1352 32.7842 64.748C32.1065 64.3883 31.6899 63.9426 31.5361 63.7715C31.3412 63.5545 31.2047 63.3614 31.1289 63.248L30.0264 61.5977L30.2793 60.5664C30.1743 60.1426 30.0342 59.5896 29.8564 58.9229C29.3375 56.9761 28.582 54.2724 27.7998 51.5146C27.0192 48.7628 26.2183 45.9786 25.6123 43.8818C25.5338 43.6103 25.4582 43.3504 25.3867 43.1035C23.7505 42.8356 21.5725 42.4793 19.3379 42.1133C14.7977 41.3696 10.0152 40.5859 9.06934 40.4297L9.05566 40.4277C8.87245 40.397 7.27213 40.1747 6.12695 38.6914C5.40618 37.7576 5.09292 36.6071 5.19727 35.4863C5.28881 34.5035 5.67447 33.7918 5.91406 33.4199C6.36604 32.7184 6.90947 32.2978 7.08301 32.165C7.33567 31.9717 7.57736 31.8198 7.75488 31.7148C8.40838 31.3286 9.28836 30.9339 10.1074 30.5869C11.8552 29.8466 14.3096 28.9214 16.7773 28.0332C19.2628 27.1386 21.8402 26.253 23.8662 25.5879C24.4707 25.3894 25.0352 25.2089 25.5391 25.0508C25.8766 23.7798 26.2795 22.0523 26.6963 20.1309C27.5813 16.0512 28.4831 11.3741 28.9219 9.04785Z"
            stroke="white"
            strokeWidth="9"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_224_68683"
            x="0.677734"
            y="0.593872"
            width="77.0684"
            height="79.1863"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="10" dy="10" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_224_68683"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_224_68683"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      <svg
        style={{
          width: "49px",
          height: "51px",
          flexShrink: 0,
          fill: "#FFEB77",
          strokeWidth: "9px",
          stroke: "#FFF",
          filter: "drop-shadow(10px 10px 0 rgba(0, 0, 0, 0.10))",
          position: "absolute",
          left: "min(486px, calc(30vw))",
          top: "80px",
        }}
        width="78"
        height="80"
        viewBox="0 0 78 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_224_68684)">
          <path
            d="M34.0792 9.52891C33.9662 9.16144 33.4347 9.18405 33.3669 9.56283C32.485 14.2383 29.726 28.4624 28.9402 28.4624C28.0017 28.4624 7.94317 35.354 9.82578 35.6706C11.7084 35.9816 28.9402 38.8027 28.9402 38.8027C28.9402 38.8027 35.5209 61.3657 34.8933 60.4273L39.908 40.0577L58.5136 34.1668C58.8585 34.0537 58.8472 33.5619 58.4966 33.4601L40.2189 27.8349L34.0792 9.52891Z"
            fill="#FFEB77"
          />
          <path
            d="M28.9453 8.72852C29.9338 3.4098 36.8819 3.70551 38.3438 8.09863L38.3457 8.09766L43.75 24.2129L59.8203 29.1592L59.8193 29.1602C64.2291 30.505 64.5666 36.9171 59.916 38.4424L59.8936 38.4502L59.8721 38.457L43.6729 43.585L39.4092 60.9062C39.3741 61.2242 39.2952 61.6456 39.1201 62.0918C38.9396 62.5517 38.352 63.8262 36.8193 64.5371C35.0878 65.3402 33.537 64.8158 32.8076 64.4287C32.1299 64.0689 31.7133 63.6233 31.5596 63.4521C31.3646 63.2351 31.2281 63.0421 31.1523 62.9287L30.0498 61.2783L30.3027 60.2471C30.1978 59.8233 30.0576 59.2703 29.8799 58.6035C29.3609 56.568 28.6055 53.9531 27.8232 51.1953C27.0427 48.4434 26.2418 45.6592 25.6357 43.5625C25.5572 43.2909 25.4816 43.031 25.4102 42.7842C23.774 42.5163 21.5959 42.16 19.3613 41.7939C14.8211 41.0503 10.0386 40.2666 9.09277 40.1104L9.0791 40.1084C8.89589 40.0777 7.29557 39.8554 6.15039 38.3721C5.42962 37.4382 5.11636 36.2877 5.2207 35.167C5.31225 34.1842 5.69791 33.4725 5.9375 33.1006C6.38948 32.3991 6.9329 31.9785 7.10645 31.8457C7.35911 31.6524 7.6008 31.5004 7.77832 31.3955C8.43182 31.0093 9.31179 30.6145 10.1309 30.2676C11.8786 29.5273 14.333 28.6021 16.8008 27.7139C19.2863 26.8192 21.8636 25.9337 23.8896 25.2686C24.4941 25.0701 25.0587 24.8895 25.5625 24.7314C25.9 23.4605 26.3029 21.733 26.7197 19.8115C27.6047 15.7318 28.5065 11.0547 28.9453 8.72852Z"
            stroke="white"
            strokeWidth="9"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_224_68684"
            x="0.701172"
            y="0.274536"
            width="77.0684"
            height="79.1863"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="10" dy="10" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_224_68684"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_224_68684"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      <svg
        style={{
          width: "49px",
          height: "51px",
          flexShrink: 0,
          fill: "#FFEB77",
          strokeWidth: "9px",
          stroke: "#FFF",
          filter: "drop-shadow(10px 10px 0 rgba(0, 0, 0, 0.10))",
          position: "absolute",
          left: "min(1814px, calc(100vw - 120px))",
          top: "47px",
        }}
        width="78"
        height="80"
        viewBox="0 0 78 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_224_68685)">
          <path
            d="M33.5226 9.24571C33.4095 8.87823 32.8781 8.90085 32.8103 9.27963C31.9283 13.9551 29.1694 28.1792 28.3836 28.1792C27.4451 28.1792 7.38652 35.0708 9.26914 35.3874C11.1517 35.6984 28.3836 38.5195 28.3836 38.5195C28.3836 38.5195 34.9642 61.0825 34.3367 60.1441L39.3513 39.7745L57.957 33.8836C58.3018 33.7705 58.2905 33.2787 57.94 33.1769L39.6623 27.5517L33.5226 9.24571Z"
            fill="#FFEB77"
          />
          <path
            d="M28.3887 8.44531C29.3771 3.12659 36.3253 3.42231 37.7871 7.81543L37.7891 7.81445L43.1934 23.9297L59.2637 28.876L59.2627 28.877C63.6725 30.2218 64.01 36.6339 59.3594 38.1592L59.3369 38.167L59.3154 38.1738L43.1162 43.3018L38.8525 60.623C38.8175 60.941 38.7386 61.3624 38.5635 61.8086C38.383 62.2684 37.7953 63.543 36.2627 64.2539C34.5311 65.057 32.9804 64.5326 32.251 64.1455C31.5733 63.7857 31.1567 63.3401 31.0029 63.1689C30.808 62.9519 30.6715 62.7589 30.5957 62.6455L29.4932 60.9951L29.7461 59.9639C29.6411 59.5401 29.501 58.9871 29.3232 58.3203C28.8043 56.3736 28.0488 53.6699 27.2666 50.9121C26.486 48.1602 25.6851 45.376 25.0791 43.2793C25.0006 43.0077 24.925 42.7478 24.8535 42.501C23.2173 42.2331 21.0393 41.8767 18.8047 41.5107C14.2645 40.7671 9.48197 39.9834 8.53613 39.8271L8.52246 39.8252C8.33925 39.7944 6.73893 39.5722 5.59375 38.0889C4.87298 37.155 4.55972 36.0045 4.66406 34.8838C4.75561 33.901 5.14127 33.1893 5.38086 32.8174C5.83284 32.1159 6.37626 31.6953 6.5498 31.5625C6.80247 31.3692 7.04416 31.2172 7.22168 31.1123C7.87518 30.7261 8.75515 30.3313 9.57422 29.9844C11.322 29.2441 13.7764 28.3189 16.2441 27.4307C18.7296 26.536 21.307 25.6505 23.333 24.9854C23.9375 24.7869 24.502 24.6063 25.0059 24.4482C25.3434 23.1773 25.7463 21.4498 26.1631 19.5283C27.0481 15.4486 27.9499 10.7715 28.3887 8.44531Z"
            stroke="white"
            strokeWidth="9"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_224_68685"
            x="0.144531"
            y="-0.00866699"
            width="77.0684"
            height="79.1863"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="10" dy="10" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_224_68685"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_224_68685"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      {/* Blue connecting line */}
      <svg
        style={{
          width: "388px",
          height: "0px",
          flexShrink: 0,
          strokeWidth: "9px",
          stroke: "#4C7EFB",
          position: "absolute",
          left: "calc(50vw - 194px)",
          top: "340px",
        }}
        width="389"
        height="10"
        viewBox="0 0 389 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.09375 5.21387L388.197 5.2139"
          stroke="#4C7EFB"
          strokeWidth="9"
        />
      </svg>

      {/* Main Steps Container - Exactly as Figma */}
      <div
        style={{
          display: "flex",
          width: "1121px",
          flexDirection: "column",
          alignItems: "center",
          gap: "26px",
          position: "absolute",
          left: "calc(50vw - 560.5px)",
          top: "291px",
          height: "164px",
        }}
      >
        {/* Step circles row - Hebrew RTL order: 1 → 2 → 3 (right to left) */}
        <div
          style={{
            display: "flex",
            padding: "14.728px",
            alignItems: "flex-start",
            gap: "372.629px",
            position: "relative",
          }}
        >
          {/* Step 1 - Rightmost - "פרטים וברכה" */}
          <div
            style={{
              display: "flex",
              width: "70.696px",
              height: "68.56px",
              padding: "16.201px 17.674px",
              alignItems: "center",
              gap: "14.728px",
              borderRadius: "82.479px",
              border:
                currentStep === 1 ? "5px solid #FFF" : "5px solid #4C7EFB",
              background: currentStep > 1 ? "#FFF" : "#4C7EFB",
              boxShadow: "14.728px 14.728px 0 0 rgba(0, 0, 0, 0.10)",
              position: "relative",
            }}
          >
            {currentStep > 1 ? (
              <svg
                width="30"
                height="22"
                viewBox="0 0 30 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <path
                  d="M5.39453 11.1105L11.4531 17.1691L25.7411 2.88110"
                  stroke="#4C7EFB"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <span
                style={{
                  fontFamily:
                    "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                  fontWeight: "700",
                  fontSize: "53px",
                  color: "rgba(255,255,255,1)",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                1
              </span>
            )}
          </div>

          {/* Blue connecting line between step 1 and 2 - only show if step 2 or 3 */}
          {currentStep >= 2 && (
            <div
              style={{
                position: "absolute",
                left: "574px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "320px",
                height: "9px",
                background: "#4C7EFB",
                borderRadius: "4.5px",
                zIndex: 0,
              }}
            />
          )}

          {/* Step 2 - Middle - "עיצוב המתנה" */}
          <div
            style={{
              display: "flex",
              width: "70.696px",
              height: "68.56px",
              padding: "16.201px 17.674px",
              alignItems: "center",
              gap: "14.728px",
              borderRadius: "82.479px",
              border:
                currentStep === 2 ? "5px solid #FFF" : "5px solid #4C7EFB",
              background: currentStep > 2 ? "#FFF" : "#4C7EFB",
              boxShadow: "14.728px 14.728px 0 0 rgba(0, 0, 0, 0.10)",
              position: "relative",
            }}
          >
            {currentStep > 2 ? (
              <svg
                width="30"
                height="22"
                viewBox="0 0 30 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <path
                  d="M5.39453 11.1105L11.4531 17.1691L25.7411 2.88110"
                  stroke="#4C7EFB"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <span
                style={{
                  fontFamily:
                    "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                  fontWeight: "700",
                  fontSize: "53px",
                  color: "rgba(255,255,255,1)",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                2
              </span>
            )}
          </div>

          {/* Blue connecting line between step 2 and 3 - only show if step 3 */}
          {currentStep >= 3 && (
            <div
              style={{
                position: "absolute",
                left: "109px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "320px",
                height: "9px",
                background: "#4C7EFB",
                borderRadius: "4.5px",
                zIndex: 0,
              }}
            />
          )}

          {/* Step 3 - Leftmost - "סיום ותשלום" */}
          <div
            style={{
              display: "flex",
              width: "70.696px",
              height: "68.56px",
              padding: "16.201px 17.674px",
              alignItems: "center",
              gap: "14.728px",
              borderRadius: "82.479px",
              border: currentStep === 3 ? "5px solid #FFF" : "none",
              background: "#4C7EFB",
              boxShadow: "14.728px 14.728px 0 0 rgba(0, 0, 0, 0.10)",
              position: "relative",
            }}
          >
            <span
              style={{
                fontFamily:
                  "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "700",
                fontSize: "53px",
                color: "rgba(255,255,255,1)",
                width: "100%",
                textAlign: "center",
              }}
            >
              3
            </span>
          </div>
        </div>

        {/* Step labels row - Hebrew RTL order: 1 → 2 → 3 (right to left) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "212px",
            alignSelf: "stretch",
            position: "relative",
          }}
        >
          {/* Step 1 label - "פרטים וברכה" */}
          <div
            style={{
              color: "#4C7EFB",
              textAlign: "right",
              textShadow: "10px 10px 0 rgba(0, 0, 0, 0.10)",
              WebkitTextStrokeWidth: currentStep === 1 ? "3px" : "0",
              WebkitTextStrokeColor: currentStep === 1 ? "#FFF" : "transparent",
              fontFamily:
                "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "40px",
              fontStyle: "normal",
              fontWeight: "900",
              lineHeight: "normal",
              position: "relative",
            }}
          >
            פרטים וברכה
          </div>

          {/* Step 2 label - "עיצוב המתנה" */}
          <div
            style={{
              color: "#4C7EFB",
              textAlign: "right",
              textShadow: "10px 10px 0 rgba(0, 0, 0, 0.10)",
              WebkitTextStrokeWidth: currentStep === 2 ? "3px" : "0",
              WebkitTextStrokeColor: currentStep === 2 ? "#FFF" : "transparent",
              fontFamily:
                "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "40px",
              fontStyle: "normal",
              fontWeight: "900",
              lineHeight: "normal",
              position: "relative",
              marginLeft: "84px",
            }}
          >
            עיצוב המתנה
          </div>

          {/* Step 3 label - "סיום ותשלום" */}
          <div
            style={{
              color: "#4C7EFB",
              textAlign: "right",
              textShadow: "10px 10px 0 rgba(0, 0, 0, 0.10)",
              WebkitTextStrokeWidth: currentStep === 3 ? "3px" : "0",
              WebkitTextStrokeColor: currentStep === 3 ? "#FFF" : "transparent",
              fontFamily:
                "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "40px",
              fontStyle: "normal",
              fontWeight: "900",
              lineHeight: "normal",
              position: "relative",
            }}
          >
            סיום ותשלום
          </div>
        </div>
      </div>
    </div>
  );
};