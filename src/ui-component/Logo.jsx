// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Berry" width="100" />
     *
     */

    // <svg width="92" height="32" viewBox="0 0 92 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    //   <path
    //     d="M33.085 26.4841V12.3839H37.9541C39.6408 12.3839 40.9202 12.7131 41.7922 13.3717C42.6642 14.0237 43.1002 14.9825 43.1002 16.2478C43.1002 16.9387 42.9251 17.5488 42.5751 18.0782C42.225 18.6011 41.7381 18.9853 41.1143 19.2306C41.8272 19.4114 42.3873 19.7761 42.7947 20.3249C43.2084 20.8737 43.4152 21.5452 43.4152 22.3392C43.4152 23.695 42.9888 24.7215 42.1359 25.4188C41.283 26.1161 40.0673 26.4712 38.4888 26.4841H33.085ZM35.9492 20.3443V24.1502H38.4028C39.0775 24.1502 39.6026 23.9888 39.9781 23.666C40.36 23.3367 40.551 22.8848 40.551 22.3102C40.551 21.0189 39.8922 20.3637 38.5747 20.3443H35.9492ZM35.9492 18.2912H38.0687C39.5135 18.2654 40.236 17.6811 40.236 16.5384C40.236 15.8992 40.0514 15.4408 39.6822 15.1632C39.3194 14.8792 38.7434 14.7371 37.9541 14.7371H35.9492V18.2912ZM53.9365 20.3733H48.4371V24.1502H54.8913V26.4841H45.573V12.3839H54.8723V14.7371H48.4371V18.0976H53.9365V20.3733ZM61.7175 21.3224H59.436V26.4841H56.5717V12.3839H61.7365C63.379 12.3839 64.6455 12.7551 65.5365 13.4975C66.4276 14.24 66.8734 15.2891 66.8734 16.6449C66.8734 17.6069 66.6661 18.4107 66.2527 19.0563C65.8455 19.6954 65.2248 20.2055 64.3907 20.5864L67.3985 26.3485V26.4841H64.3242L61.7175 21.3224ZM59.436 18.9691H61.746C62.4656 18.9691 63.0226 18.7851 63.417 18.4172C63.8114 18.0427 64.0092 17.5294 64.0092 16.8773C64.0092 16.2124 63.8214 15.6894 63.4455 15.3085C63.0768 14.9276 62.5069 14.7371 61.7365 14.7371H59.436V18.9691ZM74.2058 21.3224H71.9237V26.4841H69.0594V12.3839H74.2248C75.8667 12.3839 77.1337 12.7551 78.0248 13.4975C78.9159 14.24 79.3611 15.2891 79.3611 16.6449C79.3611 17.6069 79.1544 18.4107 78.7404 19.0563C78.3332 19.6954 77.7125 20.2055 76.879 20.5864L79.8863 26.3485V26.4841H76.8119L74.2058 21.3224ZM71.9237 18.9691H74.2343C74.9533 18.9691 75.5103 18.7851 75.9052 18.4172C76.2997 18.0427 76.4969 17.5294 76.4969 16.8773C76.4969 16.2124 76.3092 15.6894 75.9337 15.3085C75.5645 14.9276 74.9946 14.7371 74.2248 14.7371H71.9237V18.9691ZM85.8823 18.7367L88.7751 12.3839H91.9064L87.3427 21.3708V26.4841H84.4309V21.3708L79.8673 12.3839H83.008L85.8823 18.7367Z"
    //     fill={theme.palette.grey[900]}
    //   />
    //   <path
    //     d="M10.987 31.5841C4.92849 31.5841 0 26.626 0 20.5323C0 14.4385 4.92899 9.48041 10.987 9.48041C17.045 9.48041 21.974 14.4385 21.974 20.5323C21.974 26.626 17.0459 31.5841 10.987 31.5841ZM10.987 10.536C5.50765 10.536 1.04938 15.0196 1.04938 20.5318C1.04938 26.044 5.50765 30.5275 10.987 30.5275C16.4663 30.5275 20.9251 26.0429 20.9251 20.5308C20.9251 15.0186 16.4673 10.536 10.987 10.536Z"
    //     fill={theme.palette.primary.main}
    //   />
    //   <path
    //     d="M18.96 21.0225C18.6182 19.7483 15.4851 19.6108 13.6203 20.0779C12.6437 20.3235 11.6456 20.6428 10.6162 20.8265C11.3697 21.4989 12.1788 22.135 13.34 22.2932C16.2211 22.6842 18.0112 21.775 18.96 21.0225Z"
    //     fill={theme.palette.primary.main}
    //   />
    //   <path
    //     d="M13.34 22.2932C12.1764 22.135 11.3697 21.4989 10.6162 20.8265C9.45013 19.7857 8.41298 18.6579 6.37723 19.0823C3.14069 19.7572 2.71488 23.6081 5.21404 26.0828C6.28706 27.2131 7.66455 28.0041 9.17779 28.3586C10.691 28.7132 12.2742 28.616 13.7333 28.079C15.1924 27.5419 16.4641 26.5883 17.3925 25.3352C18.3209 24.0819 18.8656 22.5835 18.96 21.0235C18.0112 21.775 16.221 22.6842 13.34 22.2932Z"
    //     fill={theme.palette.secondary.main}
    //   />
    //   <path
    //     d="M15.034 13.9586C14.6301 14.8295 18.2304 15.7957 18.6611 18.6879C18.8687 15.8409 15.5335 12.882 15.034 13.9586Z"
    //     fill={theme.palette.primary.main}
    //   />
    //   <path
    //     d="M7.46619 17.5935C8.11524 17.3231 8.42345 16.5746 8.15463 15.9217C7.8858 15.2688 7.14167 14.9587 6.49262 15.2292C5.84357 15.4996 5.53536 16.2481 5.80418 16.9011C6.07306 17.5539 6.81714 17.8639 7.46619 17.5935Z"
    //     fill={theme.palette.secondary.main}
    //   />
    //   <path
    //     d="M10.3549 14.08C10.6585 13.7746 10.6585 13.2795 10.3549 12.9741C10.0513 12.6687 9.55909 12.6687 9.25551 12.9741C8.95194 13.2795 8.95194 13.7746 9.25551 14.08C9.55909 14.3854 10.0513 14.3854 10.3549 14.08Z"
    //     fill={theme.palette.primary.main}
    //   />
    //   <path
    //     d="M13.1014 9.05206C14.2245 5.7149 13.4696 3.04871 11.1614 1.78241C9.58359 2.10513 8.647 2.87335 8.12549 3.93383C11.2204 3.68185 13.1844 5.63041 13.1014 9.05206Z"
    //     fill={theme.palette.primary.main}
    //   />
    //   <path
    //     d="M25.6983 6.13641C20.1389 4.1294 16.6304 4.81756 16.0786 9.39055C19.2648 12.6973 22.474 11.1146 25.6983 6.13641Z"
    //     fill={theme.palette.primary.main}
    //   />
    //   <path
    //     d="M21.2765 4.32541C21.5343 3.21728 21.6681 1.90776 21.6881 0.41748C15.9226 1.70883 13.3224 4.17658 15.2839 8.33846C15.3816 8.36203 15.4754 8.38119 15.5696 8.40085C16.0281 5.14422 18.0463 3.93835 21.2765 4.32541Z"
    //     fill={theme.palette.primary.main}
    //   />
    // </svg>
    <svg width="92" height="32" viewBox="0 32 394 36"><defs id="SvgjsDefs1243"></defs><g id="SvgjsG1244" featurekey="xG21Y3-0" transform="matrix(2.0833333333333335,0,0,2.0833333333333335,15.833333333333332,15.833333333333332)" fill="#ea2088"><g xmlns="http://www.w3.org/2000/svg"><g><g><path d="M26,50c-4.5957031,0-7-12.0737305-7-24s2.4042969-24,7-24s7,12.0737305,7,24S30.5957031,50,26,50z M26,4     c-2.0390625,0-5,8.5703125-5,22s2.9609375,22,5,22s5-8.5703125,5-22S28.0390625,4,26,4z"></path></g><g><path d="M11.3330078,43.8183594c-0.96875,0-1.7373047-0.2822266-2.3027344-0.8476563     c-1.5292969-1.5283203-0.9882813-4.5483398,1.6074219-8.9760742c2.3115234-3.9443359,6.0097656-8.5415039,10.4130859-12.9443359     c4.4023438-4.402832,9-8.1005859,12.9443359-10.4130859c4.4296875-2.5961914,7.4472656-3.1357422,8.9755859-1.6074219     C44.5,10.5581055,43.9589844,13.578125,41.3632813,18.0058594c-2.3125,3.9443359-6.0107422,8.5415039-10.4130859,12.9438477     c-4.4033203,4.402832-9,8.1010742-12.9443359,10.4130859C15.2158203,42.9985352,12.984375,43.8183594,11.3330078,43.8183594z      M40.6552734,10.1918945c-0.9921875,0-2.78125,0.4902344-5.6494141,2.1708984     c-3.8007813,2.2285156-8.2548828,5.815918-12.5410156,10.1015625     c-4.2861328,4.2861328-7.8730469,8.7397461-10.1015625,12.5415039c-2.4707031,4.2148438-2.3691406,6.1005859-1.9189453,6.5507813     s2.3339844,0.5527344,6.5507813-1.9194336c3.8007813-2.2285156,8.2548828-5.815918,12.5410156-10.1015625     s7.8730469-8.7397461,10.1015625-12.5415039c2.4707031-4.2148438,2.3691406-6.1005859,1.9189453-6.550293     C41.4130859,10.300293,41.1220703,10.1918945,40.6552734,10.1918945z"></path></g><g><path d="M26,33c-11.9267578,0-24-2.4042969-24-7s12.0732422-7,24-7s24,2.4042969,24,7S37.9267578,33,26,33z M26,21     c-13.4296875,0-22,2.9614258-22,5s8.5703125,5,22,5s22-2.9614258,22-5S39.4296875,21,26,21z"></path></g><g><path d="M40.6679688,43.8183594c-1.6513672,0-3.8828125-0.8198242-6.6728516-2.4555664     c-3.9443359-2.3120117-8.5410156-6.0102539-12.9443359-10.4130859     c-4.4023438-4.4023438-8.1005859-8.9995117-10.4130859-12.9438477c-2.5957031-4.4277344-3.1367188-7.4477539-1.6074219-8.9760742     c1.5292969-1.5307617,4.5498047-0.9873047,8.9755859,1.6074219c3.9443359,2.3125,8.5419922,6.0102539,12.9443359,10.4130859     c4.4033203,4.402832,8.1015625,9,10.4130859,12.9443359c2.5957031,4.4277344,3.1367188,7.4477539,1.6074219,8.9760742     C42.4052734,43.5361328,41.6367188,43.8183594,40.6679688,43.8183594z M11.3457031,10.1918945     c-0.4667969,0-0.7578125,0.1083984-0.9013672,0.2519531c-0.4501953,0.449707-0.5517578,2.3354492,1.9189453,6.550293     C14.5917969,20.7958984,18.1787109,25.25,22.4648438,29.5356445s8.7402344,7.8730469,12.5419922,10.1015625     c4.2128906,2.4697266,6.0996094,2.3691406,6.5498047,1.9194336c0.4501953-0.4501953,0.5517578-2.3359375-1.9189453-6.5507813     c-2.2285156-3.8017578-5.8154297-8.2553711-10.1015625-12.5415039C25.25,18.1787109,20.7958984,14.5913086,16.9951172,12.362793     C14.1269531,10.6821289,12.3378906,10.1918945,11.3457031,10.1918945z"></path></g></g><g><path d="M26,29c-1.6542969,0-3-1.3457031-3-3s1.3457031-3,3-3s3,1.3457031,3,3S27.6542969,29,26,29z M26,25    c-0.5517578,0-1,0.4487305-1,1s0.4482422,1,1,1s1-0.4487305,1-1S26.5517578,25,26,25z"></path></g></g></g><g id="SvgjsG1245" featurekey="n48U4P-0" transform="matrix(4.718762177439167,0,0,4.718762177439167,134.52623659419652,9.008683585164814)" fill="#fffff"><path d="M4 5.720000000000001 l0 2.34 l-2.84 0 l0 -2.34 l2.84 0 z M4 9.66 l0 10.34 l-2.84 0 l0 -10.34 l2.84 0 z M13.28 5.720000000000001 c3.0266 0 4.54 1.1733 4.54 3.52 c0 1.3467 -0.64666 2.3466 -1.94 3 c0.88 0.25334 1.5367 0.69668 1.97 1.33 s0.65 1.3967 0.65 2.29 c0 1.28 -0.46334 2.29 -1.39 3.03 s-2.1434 1.11 -3.65 1.11 l-6.92 0 l0 -14.28 l6.74 0 z M12.879999999999999 11.5 c1.2667 0 1.9 -0.56666 1.9 -1.7 c0 -1.0933 -0.70666 -1.64 -2.12 -1.64 l-2.98 0 l0 3.34 l3.2 0 z M13.06 17.56 c1.5333 0 2.3 -0.62666 2.3 -1.88 c0 -1.36 -0.74666 -2.04 -2.24 -2.04 l-3.44 0 l0 3.92 l3.38 0 z M25.080000000000002 9.38 c3.0134 0.01334 4.52 0.9933 4.52 2.94 l0 5.48 c0 1.0133 0.12 1.7467 0.36 2.2 l-2.88 0 c-0.10666 -0.32 -0.17332 -0.65334 -0.19998 -1 c-0.84 0.85334 -2 1.28 -3.48 1.28 c-1.08 0 -1.9367 -0.27334 -2.57 -0.82 s-0.95 -1.3067 -0.95 -2.28 c0 -0.94666 0.3 -1.68 0.9 -2.2 c0.61334 -0.54666 1.7267 -0.89332 3.34 -1.04 c1.1467 -0.12 1.8733 -0.27 2.18 -0.45 s0.46 -0.45666 0.46 -0.83 c0 -0.46666 -0.14 -0.81332 -0.42 -1.04 s-0.74666 -0.34 -1.4 -0.34 c-0.6 0 -1.0533 0.12334 -1.36 0.37 s-0.48666 0.64332 -0.54 1.19 l-2.84 0 c0.06666 -1.1333 0.53332 -1.9933 1.4 -2.58 s2.0266 -0.88 3.48 -0.88 z M22.720000000000002 17.06 c0 0.88 0.58 1.32 1.74 1.32 c1.52 -0.01334 2.2866 -0.79334 2.3 -2.34 l0 -1.1 c-0.22666 0.22666 -0.8 0.39332 -1.72 0.49998 c-0.8 0.09334 -1.3867 0.25668 -1.76 0.49002 s-0.56 0.61 -0.56 1.13 z M37.74 9.38 c1.32 0 2.2766 0.33338 2.87 1 s0.89 1.7267 0.89 3.18 l0 6.44 l-2.84 0 l0 -5.86 c0 -0.85334 -0.13666 -1.4867 -0.41 -1.9 s-0.74334 -0.62 -1.41 -0.62 c-0.77334 0 -1.3333 0.23334 -1.68 0.7 s-0.52 1.2333 -0.52 2.3 l0 5.38 l-2.84 0 l0 -10.34 l2.7 0 l0 1.44 l0.06 0 c0.70666 -1.1467 1.7667 -1.72 3.18 -1.72 z M46.76 5.720000000000001 l0 7.66 l3.58 -3.72 l3.36 0 l-3.9 3.8 l4.34 6.54 l-3.44 0 l-2.84 -4.62 l-1.1 1.06 l0 3.56 l-2.84 0 l0 -14.28 l2.84 0 z"></path></g></svg>
  );
};

export default Logo;
