import Showdown from "showdown";
import styled from "../../../lib/styled-components";
import TertiaryButton from "../../../../kauri-components/components/Button/TertiaryButton";
import { BodyCard } from "../../../../kauri-components/components/Typography";
import AlertView from "../../../../kauri-components/components/Modal/AlertView";
import { useEffect } from "react";
import { hljs } from "../../../lib/hljs";

const ContentContainer = styled.div`
  padding: ${props => `${props.theme.space[4]}px ${props.theme.padding}`};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Content = styled.div`
  max-width: 930px;
  width: 100%;
  margin-right: ${props => props.theme.space[2]}px;
  & img {
    max-width: 100%;
  }

  & pre {
    padding: ${props => props.theme.space[1]}px;
    background: ${props => props.theme.colors.bgPrimary};
    border-radius: 4px;
    color: white;
  }
`;

const converter = new Showdown.Converter();

const DeleteDraftArticleSvgIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="18" height="18" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0" transform="scale(0.00833333)" />
      </pattern>
      <image
        id="image0"
        width="120"
        height="120"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAABmJLR0QA/wD/AP+gvaeTAAAFS0lEQVR4nO3cT0ycRRzG8WfeXRYTobsYapvGEC/20miMF6I2EaOE4h3u2CpJT5C2AZUDB9SSgJAYSaBV7rYHvZgigo3/Ug41MRUTPBnioXiQpeKh7+77jgd2G4KUfXffmXc7P57PkW5mNvvtzvuyMwtARERERERERERERGSXqvcTMOHJKxefU1p/AIUOAI/HHO5fAN8iDN/d6J+6E//Z1ZfzgY/OXXreU+H3AJoMD72tPX36r7Mf/WJ43ER59X4CcXkqnID5uADQpEI1YWHcRLkdeHQ0DaDD4gwdpTmcZWWJPj43eEor70NovAKFIzbmEEPjHjzcVB7eufvm5G+mhzce+Njs4LPwvJ9gZ9mUbBth+JLpGzvzS7TnTYJxa9EEZf6abzbw5z0p2L0myqbUq6XX0Bi3b7KoIrOBe68FAG4aHfMQUcBy6TU0xvw7OAwvANg2Pq58/+gwvGR6UOOBN/qn7qgU2gH9JYC86fEFykPjCw9Bu4SPRomIiIiIiIjqyfqRnWNXLmjbc7hs461Jqw242SAcAwvHwMIxsHAMLBwDC8fAwjGwcAwsHAMLx8DCMbBwDCwcAwvHwMIxsHAMLBwDC8fAwjkZWANrCugJwuBEEAYnFNCjgN9dGT9Jzv0FGQ2sPVZoeHH9/OXNXT++npsf+KYxSN2ARnusCRRW/FRwJt83vfubkdfbZoaX/IbCLQ2cjDV+wpx7B3vAyJ64AIB833TeD9JdUFipeXCFFT9Id+2JCwBYP395E0qP1Dx2nTgXOEh7Pzzs3zb7x7f8IN0F4FYNQ99u9Bu6N/vHtx72gFAH39Uwbl05F1j7hQPPEW/2j2/5YfoMqot8u7HQ0LnfyrBb6DUa/QMpSXAucDrlna70mAeRoyzXCit+mH6tUlwASOviyxGf5iPDucDQaiw3P5Cr9LAHy/VBkUvX3IOW5bLc/EAOWo1V+WzrzrnAGjiZKXpLT10dfKLSYytckytec8taZoeyjUHqhmt30ICDgQFAQb3ga7UYOfL/r8mRrrnATtxMqrgQ+9evOnEyMBAr8qGJCzgcGNiJXID3VcvsULbSY8uRo95QSYgLCPn6qIb+OaN055/npv42MV6Scfn10QiqWa4rkfLOLRMRGDATWVpcQFBgIF5kiXEBYYGB2iJLjQs4uF0YhYLSnp+p7uZOQ+TfEhH3DkYVv+eW1bhB4QRpgauOWyY1sqTANcctkxhZSuDYccukRXY/cBX7uS2zQ9lqPtaMdfznEeF64Kq2/DKp4kKDV1g2sNXoDJcD17QrZGCr0SmuBo615XeYIjsXWANr99PB63G3/KrdaryfDrpdPPzuXGAPGNnv3PJekT5+1GjPpIoLUSLn+6bzPBedgIPORZdV9dmyRnvUGy+ei05ApXPRtWwcRL0m81x0Ag46Fx1nVyjKNZnnopOg1VjbzHDL3h/n5gdysbf8Stfk/c5dt80Mt7h4LtrJM1mlu9n3imHwI7DzrtZQ70PjGRfG3832mSwn94NLB9CvpbydS6I2/F/I9vhJcm+JpqowsHAMLBwDC8fAwjGwcAwsHAMLx8DCMbBwDCxcEoG3E5jDTRr3bE9hP7DGuvU5XKXsvzb2A3tYtD6Ho5RSX9ueI4ElWl0FENifxzkBwuAz25NYD7xxbuJXrTBrex4Hzdx9e2rV9iSJ3EUfPdI8CGA5ibkcsdSabb6YxESJBF7tHfVbs83dGvgEh3u5DgB83JptfmO1d9RPYkLrZ7L2Oj43eErDOwuFTgBPA2hK+jkkbBvAH9BYVAg/TWJZJiIiIiIiIiIiIiIiIiIi+f4Dnd1WAMhT8bQAAAAASUVORK5CYII="
      />
    </defs>
  </svg>
);

interface IProps {
  id: string;
  version: number;
  content: string;
  deleteDraftArticleAction: (
    { id, version }: { id: string; version: number }
  ) => void;
  closeModalAction: any;
  openModalAction: any;
}

export default ({
  id,
  version,
  content,
  closeModalAction,
  openModalAction,
  deleteDraftArticleAction,
}: IProps) => {
  useEffect(() => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
  }, []);

  return (
    <ContentContainer>
      <Content
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(JSON.parse(content).markdown),
        }}
      />
      <TertiaryButton
        color={"textPrimary"}
        icon={<DeleteDraftArticleSvgIcon />}
        handleClick={() =>
          openModalAction({
            children: (
              <AlertView
                closeModalAction={() => closeModalAction()}
                confirmButtonAction={() => {
                  deleteDraftArticleAction({ id, version });
                  closeModalAction();
                }}
                content={
                  <div>
                    <BodyCard>
                      You won't be able to retrieve the draft article after
                      deleting.
                    </BodyCard>
                  </div>
                }
                title={"Are you sure?"}
              />
            ),
          })
        }
      >
        Delete Draft Article
      </TertiaryButton>
    </ContentContainer>
  );
};
