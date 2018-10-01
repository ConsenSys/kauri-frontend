//@flow
import React from 'react'

export default () => (
  <div className='center-horizontally'>
    <div className='lds-css ng-scope'>
      <div className='lds-spinner'>
        <style type='text/css'>
          {`
        .center-horizontally {
          display: flex;
          width: 100%;
          flex-direction: row;
          justify-content: center;
        }
        @keyframes lds-spinner {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        @-webkit-keyframes lds-spinner {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
        }
        .lds-spinner {
        position: relative;
        }
        .lds-spinner div {
        left: 98px;
        top: 81px;
        position: absolute;
        -webkit-animation: lds-spinner linear 1s infinite;
        animation: lds-spinner linear 1s infinite;
        background: #0ba986;
        width: 4px;
        height: 6px;
        border-radius: 58%;
        -webkit-transform-origin: 2px 19px;
        transform-origin: 2px 19px;
        }
        .lds-spinner div:nth-child(1) {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-animation-delay: -0.923076923076923s;
        animation-delay: -0.923076923076923s;
        }
        .lds-spinner div:nth-child(2) {
        -webkit-transform: rotate(27.692307692307693deg);
        transform: rotate(27.692307692307693deg);
        -webkit-animation-delay: -0.846153846153846s;
        animation-delay: -0.846153846153846s;
        }
        .lds-spinner div:nth-child(3) {
        -webkit-transform: rotate(55.38461538461539deg);
        transform: rotate(55.38461538461539deg);
        -webkit-animation-delay: -0.769230769230769s;
        animation-delay: -0.769230769230769s;
        }
        .lds-spinner div:nth-child(4) {
        -webkit-transform: rotate(83.07692307692308deg);
        transform: rotate(83.07692307692308deg);
        -webkit-animation-delay: -0.692307692307692s;
        animation-delay: -0.692307692307692s;
        }
        .lds-spinner div:nth-child(5) {
        -webkit-transform: rotate(110.76923076923077deg);
        transform: rotate(110.76923076923077deg);
        -webkit-animation-delay: -0.615384615384615s;
        animation-delay: -0.615384615384615s;
        }
        .lds-spinner div:nth-child(6) {
        -webkit-transform: rotate(138.46153846153845deg);
        transform: rotate(138.46153846153845deg);
        -webkit-animation-delay: -0.538461538461538s;
        animation-delay: -0.538461538461538s;
        }
        .lds-spinner div:nth-child(7) {
        -webkit-transform: rotate(166.15384615384616deg);
        transform: rotate(166.15384615384616deg);
        -webkit-animation-delay: -0.461538461538462s;
        animation-delay: -0.461538461538462s;
        }
        .lds-spinner div:nth-child(8) {
        -webkit-transform: rotate(193.84615384615384deg);
        transform: rotate(193.84615384615384deg);
        -webkit-animation-delay: -0.384615384615385s;
        animation-delay: -0.384615384615385s;
        }
        .lds-spinner div:nth-child(9) {
        -webkit-transform: rotate(221.53846153846155deg);
        transform: rotate(221.53846153846155deg);
        -webkit-animation-delay: -0.307692307692308s;
        animation-delay: -0.307692307692308s;
        }
        .lds-spinner div:nth-child(10) {
        -webkit-transform: rotate(249.23076923076923deg);
        transform: rotate(249.23076923076923deg);
        -webkit-animation-delay: -0.230769230769231s;
        animation-delay: -0.230769230769231s;
        }
        .lds-spinner div:nth-child(11) {
        -webkit-transform: rotate(276.9230769230769deg);
        transform: rotate(276.9230769230769deg);
        -webkit-animation-delay: -0.153846153846154s;
        animation-delay: -0.153846153846154s;
        }
        .lds-spinner div:nth-child(12) {
        -webkit-transform: rotate(304.61538461538464deg);
        transform: rotate(304.61538461538464deg);
        -webkit-animation-delay: -0.076923076923077s;
        animation-delay: -0.076923076923077s;
        }
        .lds-spinner div:nth-child(13) {
        -webkit-transform: rotate(332.3076923076923deg);
        transform: rotate(332.3076923076923deg);
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
        }
        .lds-spinner {
        width: 200px !important;
        height: 200px !important;
        -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
        transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
        }
`}
        </style>
      </div>
    </div>
  </div>
)
