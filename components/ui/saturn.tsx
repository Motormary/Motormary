import * as React from 'react'
type Props = React.SVGProps<SVGSVGElement>

const Moon = (props: Props) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    {...props}>
    <g id="SVGRepo_iconCarrier">
      <defs>
        <style>
          {`.moon-1{fill:#ffffff;}
           .moon-1,.moon-3,.moon-5,.moon-6,.moon-7{
             stroke:#54596e;stroke-width:2px;
           }
           .moon-1,.moon-3,.moon-6,.moon-7{
             stroke-linecap:round;stroke-linejoin:round;
           }
           .moon-2,.moon-4,.moon-5{fill:#54596e;}
           .moon-2{opacity:0.2;}
           .moon-3{fill:none;}
           .moon-5{stroke-miterlimit:10;}
           .moon-6{fill:#a1b7ff;}
           .moon-7{fill:#fff35f;}`}
        </style>
      </defs>
      <title>{'moon'}</title>
      <g id="moon">
        <circle className="moon-1" cx={32} cy={32} r={20} />
        <path
          className="moon-2"
          d="M46.37,18.1A20,20,0,0,1,14.63,41.9,20,20,0,1,0,46.37,18.1Z"
        />
        <circle className="moon-4" cx={20.5} cy={27.5} r={1.5} />
        <circle className="moon-4" cx={38.5} cy={25.5} r={1.5} />
        <path className="moon-5" d="M26.77,31.6a3,3,0,0,0,5.89-1.15Z" />
      </g>
    </g>
  </svg>
)
export default Moon
