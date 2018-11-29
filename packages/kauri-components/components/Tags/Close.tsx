interface IProps {
    onClick: () => void;
}

const Plus = (props: IProps) => (
    <svg className="closeSVG" onClick={props.onClick} width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect width="18" height="18" fill="url(#pattern0)"/>
        <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0" transform="scale(0.00833333)"/>
        </pattern>
        <image id="image0" width="120" height="120" xlinkHref="data:image/png;base64,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"/>
        </defs>
    </svg>
  );

  export default Plus;