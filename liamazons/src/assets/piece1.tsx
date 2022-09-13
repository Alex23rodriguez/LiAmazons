import { FC } from "react";

export const Piece1: FC<{ bgcolor: string }> = ({ bgcolor }) => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
    // x="0px"
    // y="0px"
    width="85%"
    height="85%"
    viewBox="0 0 512 512"
    // style="enable-background:new 0 0 512 512;"
    // xml:space="preserve"
    fill="black"
  >
    <circle cx={256} cy={256} r={240} fill={bgcolor} />
    <g>
      <g>
        <g>
          <path
            d="M256,80.574C159.27,80.574,80.574,159.27,80.574,256S159.27,431.426,256,431.426S431.426,352.73,431.426,256
				S352.73,80.574,256,80.574z M256,411.028c-85.483,0-155.028-69.545-155.028-155.028S170.517,100.972,256,100.972
				S411.028,170.517,411.028,256S341.483,411.028,256,411.028z"
          />
          <path
            d="M437.02,74.98C388.667,26.628,324.38,0,256,0S123.333,26.628,74.98,74.98C26.628,123.333,0,187.62,0,256
				s26.628,132.667,74.98,181.02C123.333,485.372,187.62,512,256,512s132.667-26.628,181.02-74.98
				C485.372,388.667,512,324.38,512,256S485.372,123.333,437.02,74.98z M256,491.602c-129.911,0-235.602-105.69-235.602-235.602
				S126.089,20.398,256,20.398S491.602,126.089,491.602,256S385.911,491.602,256,491.602z"
          />
        </g>
      </g>
    </g>
    <g>
      <g>
        <path
          d="M378.805,428.055c-3.052-4.733-9.363-6.098-14.098-3.047c-32.392,20.879-69.982,31.915-108.706,31.915
			c-5.633,0-10.199,4.566-10.199,10.199c0,5.633,4.566,10.199,10.199,10.199c42.652,0,84.064-12.161,119.758-35.169
			C380.492,439.102,381.856,432.79,378.805,428.055z"
        />
      </g>
    </g>
    <g>
      <g>
        <path
          d="M413.816,396.61c-4.02-3.945-10.477-3.886-14.424,0.134c-2.113,2.153-4.311,4.294-6.535,6.363
			c-4.122,3.838-4.353,10.292-0.515,14.415c2.009,2.158,4.734,3.249,7.468,3.249c2.489,0,4.983-0.905,6.947-2.733
			c2.446-2.277,4.866-4.633,7.192-7.004C417.896,407.013,417.836,400.556,413.816,396.61z"
        />
      </g>
    </g>
  </svg>
);
