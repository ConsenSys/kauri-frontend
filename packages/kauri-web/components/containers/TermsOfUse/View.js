// @flow
import React, { Component } from "react";
import styled from "styled-components";
import { ActionBadge } from "../../common/ActionBadge";
import GreenArrow from "../../common/GreenArrow";
import { Helmet } from "react-helmet";

const ActionsHeader = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 76px;
  padding: 36px ${props => props.theme.padding};
  background: ${props => props.theme.secondaryColor};
`;

const Content = styled.section`
  padding: 0 ${props => props.theme.padding};
`;

const PrivacyPolicyText = styled.section`
  padding: 1.5em 0;
`;

const PrivacyPolicyHeader = styled.h3`
  margin-top: 20px;
  text-align: center;
  font-size: 28px;
`;

const PrivacyPolicySecondHeader = styled.h5`
  font-size: 14px;
  text-align: center;
`;

const Clause = styled(PrivacyPolicySecondHeader)`
  margin-top: 20px;
`;

type Props = {
  routeChangeAction: string => void,
};

type State = {};

class TermsOfUse extends Component<Props, State> {
  render() {
    const { routeChangeAction } = this.props;

    return (
      <section>
        <Helmet>
          <title>Beginner to Advanced Blockchain & Ethereum Tutorials | Terms Of Use - Kauri</title>
          <meta
            name="description"
            content="Discover the best blockchain related articles, tutorials and how-to guides"
          />
          <link
            rel="canonical"
            href={`https://kauri.io/terms-of-use`}
          />
        </Helmet>
        <ActionsHeader>
          <ActionBadge onClick={() => routeChangeAction("back")}>
            <GreenArrow direction="left" />
            <span>Go Back</span>
          </ActionBadge>
        </ActionsHeader>
        <Content>
          <Clause>
            THIS VERSION OF THE KAURI PLATFORM IS STILL UNDERGOING TESTING AND
            SMART CONTRACT AUDITING BEFORE ITS MAINNET RELEASE. THIS IS A
            RINKEBY VERSION AND IS NOT YET FULLY FEATURED. YOU ACKNOWLEDGE AND
            ACCEPT THAT THE SITE (A) MAY CONTAIN BUGS, ERRORS, AND DEFECTS, (B)
            MAY FUNCTION IMPROPERLY OR BE SUBJECT TO PERIODS OF DOWNTIME AND
            UNAVAILABILITY, (C) MAY RESULT IN TOTAL OR PARTIAL LOSS OR
            CORRUPTION OF DATA USED IN THE SITE, AND (D) MAY BE MODIFIED AT ANY
            TIME, INCLUDING THROUGH THE RELEASE OF SUBSEQUENT VERSIONS, ALL WITH
            OR WITHOUT NOTICE. THE CURRENT VERSION OF THE PLATFORM IS AVAILABLE
            ON AN “AS IS” AND “AS AVAILABLE” BASIS. THANK YOU FOR YOUR SUPPORT
            WHILE WE CONTINUE TO WORK ON DELIVERING A PRODUCT THAT FULFILLS THE
            NEEDS OF THE ETHEREUM DEVELOPER COMMUNITY.{" "}
          </Clause>
          <PrivacyPolicyHeader>Terms of Use</PrivacyPolicyHeader>
          <PrivacyPolicySecondHeader>VERSION 1.0</PrivacyPolicySecondHeader>
          <PrivacyPolicySecondHeader>
            Last Updated: May 1st, 2018
          </PrivacyPolicySecondHeader>

          <PrivacyPolicyText>
            <p>
              Welcome to ConsenSys AG’s Kauri{" "}
              <b>(“Kauri”, “Company”, “we”, “our”, or “us”) </b>. These terms of
              use <b>(“Terms” or “Terms of Use”) </b> govern your use of the
              website located at{" "}
              <a href="https://www.kauri.io">https://www.kauri.io</a>{" "}
              <b>(the “Site”)</b>, platform, and all related tools,
              applications, data, software, and other services provided by us{" "}
              <b>(the “Service”)</b>. Certain features of the Site may be
              subject to additional guidelines, terms, or rules, which will be
              posted on the Site in connection with such features. All such
              additional terms, guidelines, and rules are incorporated by
              reference into these Terms and constitute a legally binding
              agreement between you and Company in relation to your use of the
              Service. Any personal information submitted in connection with
              your use of the Service is subject to our{" "}
              <a href="/privacy-policy">Privacy Policy</a>, which is hereby
              incorporated by reference into these Terms.
            </p>
            <h4>
              {" "}
              THESE TERMS SET FORTH THE LEGALLY BINDING TERMS AND CONDITIONS
              THAT GOVERN YOUR USE OF THE SITE. BY ACCESSING OR USING THE SITE,
              YOU ARE ACCEPTING THESE TERMS (ON BEHALF OF YOURSELF OR THE ENTITY
              THAT YOU REPRESENT), AND YOU REPRESENT AND WARRANT THAT YOU HAVE
              THE RIGHT, AUTHORITY, AND CAPACITY TO ENTER INTO THESE TERMS (ON
              BEHALF OF YOURSELF OR THE ENTITY THAT YOU REPRESENT). YOU FURTHER
              REPRESENT AND WARRANT THAT YOU ARE OTHERWISE LEGALLY PERMITTED TO
              USE THE SERVICES IN YOUR JURISDICTION AND THAT THE COMPANY IS NOT
              LIABLE FOR YOUR COMPLIANCE WITH SUCH APPLICABLE LAWS. YOU MAY NOT
              ACCESS OR USE THE SITE OR ACCEPT THE TERMS IF YOU ARE NOT AT LEAST
              13 YEARS OLD. IF YOU DO NOT AGREE WITH ALL OF THE PROVISIONS OF
              THESE TERMS, DO NOT ACCESS AND/OR USE THE SITE.
            </h4>
            <h4>
              THESE TERMS REQUIRE THE USE OF ARBITRATION (SECTION 13.2) ON AN
              INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR
              CLASS ACTIONS, AND ALSO LIMIT THE REMEDIES AVAILABLE TO YOU IN THE
              EVENT OF A DISPUTE.
            </h4>
            <h3>Accounts</h3>
            <ol>
              <li>
                <b>Account Creation. </b>
                <p>
                  In order to use certain features of the Site, you must
                  register for an account
                  <b>(“Account”)</b> and provide certain information about
                  yourself as prompted by the registration page. You represent
                  and warrant that: <b>(a)</b> all required registration
                  information you submit is truthful and accurate; <b>(b)</b>{" "}
                  you will maintain the accuracy of such information. You may
                  delete your Account at any time, for any reason, by contacting
                  the kauri team at <a href="mailto:info@kauri.io">info@kauri.io</a>.
                  Company may suspend or terminate your access to the Site in
                  accordance with Section 12.
                  <p>
                    Note: If your account is deleted by your choice or
                    otherwise, your contributions to Kauri will persist.
                  </p>
                </p>
              </li>
              <li>
                <b>Account Responsibilities.</b>
                <p>
                  {" "}
                  You are responsible for maintaining the confidentiality of
                  your Account login information and are fully responsible for
                  all activities that occur under your Account. You agree to
                  immediately notify Company of any unauthorized use, or
                  suspected unauthorized use of your Account or any other breach
                  of security. Company cannot and will not be liable for any
                  loss or damage arising from your failure to comply with the
                  above requirements.
                </p>
              </li>
            </ol>
            <h3>Access to the site</h3>
            <ol>
              <li>
                <b>License. </b>
                <p>
                  Subject to these Terms, Company grants you a non-transferable,
                  non-exclusive, revocable, limited license to use and access
                  the Site solely for your own personal, noncommercial use.
                </p>
              </li>
              <li>
                <b>Certain Restrictions.</b>
                <p>
                  The rights granted to you in these Terms are subject to the
                  following restrictions unless authorized by Company: (a) you
                  shall not license, sell, rent, lease, transfer, assign,
                  distribute, host, or otherwise commercially exploit the Site,
                  whether in whole or in part, or any content displayed on the
                  Site; (b) you shall not modify, make derivative works of,
                  disassemble, reverse compile or reverse engineer any part of
                  the Site; (c) you shall not access the Site in order to build
                  a similar or competitive website, product, or service; and (d)
                  except as expressly stated herein, no part of the Site may be
                  copied, reproduced, distributed, republished, downloaded,
                  displayed, posted or transmitted in any form or by any means.
                  Unless otherwise indicated, any future release, update, or
                  other addition to functionality of the Site shall be subject
                  to these Terms. All copyright and other proprietary notices on
                  the Site (or on any content displayed on the Site) must be
                  retained on all copies thereof.
                </p>
              </li>
              <li>
                <b>Modification.</b>
                <p>
                  Company reserves the right, at any time, to modify, suspend,
                  or discontinue the Site (in whole or in part) with or without
                  notice to you. You agree that Company will not be liable to
                  you or to any third party for any modification, suspension, or
                  discontinuation of the Site or any part thereof. Note: Company
                  cannot and will not modify User Content itself as it is stored
                  in decentralized IPFS store.
                </p>
              </li>
              <li>
                <b>No Support or Maintenance.</b>
                <p>
                  You acknowledge and agree that Company will have no obligation
                  to provide you with any support or maintenance in connection
                  with the Site.
                </p>
              </li>
              <li>
                <b>Ownership.</b>
                <p>
                  Excluding any User Content that you may provide (defined
                  below), you acknowledge that all the intellectual property
                  rights, including copyrights, patents, trademarks, and trade
                  secrets, in the Site and its content are owned by Company or
                  Company’s suppliers. Neither these Terms (nor your access to
                  the Site) transfers to you or any third party any rights,
                  title or interest in or to such intellectual property rights,
                  except for the limited access rights expressly set forth in
                  Section ‎2.1. Company and its suppliers reserve all rights not
                  granted in these Terms. There are no implied licenses granted
                  under these Terms.
                </p>
              </li>
            </ol>

            <h3>User Content</h3>

            <ol>
              <li>
                <b>User Content. “User Content” </b>
                <span>
                  means any and all information and content that a user submits
                  to, or uses with, the Site (e.g., content in the user’s
                  profile or postings). You are solely responsible for your User
                  Content. You assume all risks associated with use of your User
                  Content, including any reliance on its accuracy, completeness
                  or usefulness by others, or any disclosure of your User
                  Content that personally identifies you or any third party. You
                  hereby represent and warrant that your User Content does not
                  violate our Acceptable Use Policy (defined in Section ‎3.3).
                  You may not represent or imply to others that your User
                  Content is in any way provided, sponsored or endorsed by
                  Company. Because you alone are responsible for your User
                  Content, you may expose yourself to liability if, for example,
                  your User Content violates the Acceptable Use Policy. Company
                  is not obligated to backup or maintain any User Content, and
                  your User Content may be deleted at any time without prior
                  notice. You are solely responsible for creating and
                  maintaining your own backup copies of your User Content if you
                  desire.
                </span>
              </li>
              <li>
                <b>License.</b>
                <p>
                  All User Content will be licensed under the Creative Commons
                  Attribution Share Alike license unless a project specifies
                  content be licensed differently (ie. MIT, Apache, etc). Any
                  User Content created for and contributed to a particular
                  project on the Site shall be licensed according to the
                  project’s preferred license as stated on the Site. You hereby
                  grant (and you represent and warrant that you have the right
                  to grant) to Company an irrevocable, non-exclusive,
                  royalty-free and fully paid, worldwide license to reproduce,
                  distribute, publicly display and perform, prepare derivative
                  works of, incorporate into other works, and otherwise use and
                  exploit your User Content, and to grant sublicenses of the
                  foregoing rights, solely for the purposes of including your
                  User Content in the Site. You hereby irrevocably waive (and
                  agree to cause to be waived) any claims and assertions of
                  moral rights or attribution with respect to your User Content.
                </p>
              </li>
              <li>
                <b>Acceptable Use Policy. </b>
                The following terms constitute our{" "}
                <b>“Acceptable Use Policy”</b>:
                <ol>
                  <li>
                    <b>(a) </b>
                    <span>
                      You agree not to use the Site to collect, upload,
                      transmit, display, or distribute any User Content that
                      (i)violates any third-party right, including any
                      copyright, trademark, patent, trade secret, moral right,
                      privacy right, right of publicity, or any other
                      intellectual property or proprietary right; (ii)is
                      unlawful, harassing, abusive, tortious, threatening,
                      harmful, invasive of another’s privacy, vulgar,
                      defamatory, false, intentionally misleading, trade
                      libelous, pornographic, obscene, patently offensive,
                      promotes racism, bigotry, hatred, or physical harm of any
                      kind against any group or individual or is otherwise
                      objectionable; (iii)is harmful to minors in any way; or
                      (iv)is in violation of any law, regulation, or obligations
                      or restrictions imposed by any third party.
                    </span>
                  </li>
                  <li>
                    <b>(b) </b>
                    <span>
                      In addition, you agree not to: (i) upload, transmit, or
                      distribute to or through the Site any malicious code or
                      software intended to damage or alter a computer system or
                      data; (ii) send through the Site unsolicited or
                      unauthorized advertising, promotional materials, junk
                      mail, spam, chain letters, pyramid schemes, or any other
                      form of duplicative or unsolicited messages, whether
                      commercial or otherwise; (iii) use the Site to harvest,
                      collect, gather or assemble information or data regarding
                      other users, including e-mail addresses, without their
                      consent; (iv) interfere with, disrupt, or create an undue
                      burden on servers or networks connected to the Site, or
                      violate the regulations, policies or procedures of such
                      networks; (v) attempt to gain unauthorized access to the
                      Site (or to other computer systems or networks connected
                      to or used together with the Site), whether through
                      password mining or any other means; (vi) harass or
                      interfere with any other user’s use and enjoyment of the
                      Site; or (vi) use software or automated agents or scripts
                      that Company has not approved to produce multiple accounts
                      on the Site, or to generate automated searches, requests,
                      or queries to (or to strip, scrape, or mine data from) the
                      Site (provided, however, that we conditionally grant to
                      the operators of public search engines revocable
                      permission to use spiders to copy materials from the Site
                      for the sole purpose of and solely to the extent necessary
                      for creating publicly available searchable indices of the
                      materials, but not caches or archives of such materials,
                      subject to the parameters set forth in our robots.txt
                      file).
                    </span>
                  </li>
                  <li>
                    <b>Enforcement. </b>
                    <span>
                      We reserve the right (but have no obligation) to review
                      any User Content, and to investigate and/or take
                      appropriate action against you in our sole discretion if
                      you violate the Acceptable Use Policy or any other
                      provision of these Terms or otherwise create liability for
                      us or any other project or person. Such action may include
                      no longer maintaining some or all of your User Content,
                      limiting or blocking your access to the Services, and/or
                      reporting you to law enforcement authorities.
                    </span>
                  </li>
                  <li>
                    <b>Feedback. </b>
                    <span>
                      Should you encounter any bugs, glitches, lack of
                      functionality or other problems on the website, please let
                      us know as soon as possible. We appreciate your feedback
                      as it helps us develop the platform and offer the best
                      Service possible. If you provide Company with any feedback
                      or suggestions regarding the Site <b>(“Feedback”) </b>,
                      you hereby assign to Company all rights in such Feedback
                      and agree that Company shall have the right to use and act
                      fully on such Feedback and related information in any
                      manner it deems appropriate. Company will treat any
                      Feedback you provide to Company as non-confidential and
                      non-proprietary. You agree that you will not submit to
                      Company any information or ideas that you consider to be
                      confidential or proprietary.
                    </span>
                  </li>
                  <li>
                    <b>Rewards. </b>
                    <span>
                      Company from time to time, in its sole discretion, may
                      decide to offer prizes to incentivize user participation,
                      however, any reward or benefit offered by Company does not
                      create, constitute, or give rise to any legal or
                      contractual rights in users of the Site and Service. You
                      acknowledge that Company has no legal obligation to
                      provide rewards to any contributor.
                    </span>
                  </li>
                </ol>
              </li>
            </ol>

            <h3>Indemnifaction</h3>
            <p>
              You agree to indemnify and hold Company (and its officers,
              employees, and agents) harmless, including costs and attorneys’
              fees, from any claim or demand made by any third party due to or
              arising out of (a) your use of the Site, (b) your violation of
              these Terms, (c) your violation of applicable laws or regulations
              or (d) your User Content. Company reserves the right, at your
              expense, to assume the exclusive defense and control of any matter
              for which you are required to indemnify us, and you agree to
              cooperate with our defense of these claims. You agree not to
              settle any matter without the prior written consent of Company.
              Company will use reasonable efforts to notify you of any such
              claim, action or proceeding upon becoming aware of it.
            </p>

            <h3>Third party links; other users</h3>

            <ol>
              <li>
                <b>Third-Party Links. </b>
                <span>
                  The Site may contain links to third-party websites and
                  services, a (collectively, <b>“Third-Party Links”</b>). Such
                  Third-Party Links are not under the control of Company, and
                  Company is not responsible for any Third-Party Links. Company
                  provides access to these Third-Party Links only as a
                  convenience to you, and does not review, approve, monitor,
                  endorse, warrant, or make any representations with respect to
                  Third-Party Links. You use all Third-Party Links at your own
                  risk, and should apply a suitable level of caution and
                  discretion in doing so. When you click on any of the
                  Third-Party Links, the applicable third party’s terms and
                  policies apply, including the third party’s privacy and data
                  gathering practices. You should make whatever investigation
                  you feel necessary or appropriate before proceeding with any
                  transaction in connection with such Third-Party Links.
                </span>
              </li>
              <li>
                <b>Other Users.</b>
                <span>
                  Each Site user is solely responsible for any and all of its
                  own User Content. Because we do not control User Content, you
                  acknowledge and agree that we are not responsible for any User
                  Content, whether provided by you or by others. We make no
                  guarantees regarding the accuracy, currency, suitability, or
                  quality of any User Content. Your interactions with other Site
                  users are solely between you and such users. You agree that
                  Company will not be responsible for any loss or damage
                  incurred as the result of any such interactions. If there is a
                  dispute between you and any Site user, we are under no
                  obligation to become involved.
                </span>
              </li>
              <li>
                <b>Release.</b>
                <span>
                  You hereby release and forever discharge the Company (and our
                  officers, employees, agents, successors, and assigns) from,
                  and hereby waive and relinquish, each and every past, present
                  and future dispute, claim, controversy, demand, right,
                  obligation, liability, action and cause of action of every
                  kind and nature (including personal injuries, death, and
                  property damage), that has arisen or arises directly or
                  indirectly out of, or that relates directly or indirectly to,
                  the Site (including any interactions with, or act or omission
                  of, other Site users or any Third-Party Links & Ads). IF YOU
                  ARE A CALIFORNIA RESIDENT, YOU HEREBY WAIVE CALIFORNIA CIVIL
                  CODE SECTION 1542 IN CONNECTION WITH THE FOREGOING, WHICH
                  STATES: “A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE
                  CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR
                  AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM OR
                  HER MUST HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH
                  THE DEBTOR.”
                </span>
              </li>
              <li>
                <b>Third party beneficiaries.</b>
                <span>
                  You agree that, except as otherwise expressly provided in
                  these Terms, there shall be no third party beneficiaries to
                  the Terms. The Terms of Use will not be construed as creating
                  or implying any relationship of agency, franchise,
                  partnership, or joint venture between you and Company, except
                  and solely to the extent expressly stated in these Terms.
                </span>
              </li>
            </ol>

            <h3>Disclaimers</h3>

            <p>
              THE SITE IS PROVIDED ON AN “AS-IS” AND “AS AVAILABLE” BASIS, AND
              COMPANY (AND OUR SUPPLIERS) EXPRESSLY DISCLAIM ANY AND ALL
              WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER EXPRESS, IMPLIED,
              OR STATUTORY, INCLUDING ALL WARRANTIES OR CONDITIONS OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET
              ENJOYMENT, ACCURACY, OR NON-INFRINGEMENT. WE (AND OUR SUPPLIERS)
              MAKE NO WARRANTY THAT THE SITE WILL MEET YOUR REQUIREMENTS, WILL
              BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE
              BASIS, OR WILL BE ACCURATE, RELIABLE, FREE OF VIRUSES OR OTHER
              HARMFUL CODE, COMPLETE, LEGAL, OR SAFE. IF APPLICABLE LAW REQUIRES
              ANY WARRANTIES WITH RESPECT TO THE SITE, ALL SUCH WARRANTIES ARE
              LIMITED IN DURATION TO NINETY (90) DAYS FROM THE DATE OF FIRST
              USE.
            </p>

            <p>
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED
              WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU. SOME
              JURISDICTIONS DO NOT ALLOW LIMITATIONS ON HOW LONG AN IMPLIED
              WARRANTY LASTS, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU.
            </p>

            <h3>Further Disclaimers</h3>

            <p>
              Without limiting the generality of Section 6, neither Company nor
              its affiliates or licensors will have any responsibilities or
              liability with respect to the following: (a) the Service could be
              impacted by one or more regulatory inquiries or actions, which
              could prevent or limit the ability of Company to continue to
              develop or provide the Service, or for you and your users to use
              the Service, (b) Company has no obligation to update the Service
              or its underlying platforms and networks to address, mitigate, or
              remediate any security or other vulnerabilities in the Services,
              or such platforms or networks, and (c) portions of the Service or
              any other underlying networks and platforms may rest on
              open-source software, and there is a risk that weaknesses or bugs
              that may be introduced in the infrastructural elements of the
              Service or any other underlying networks and platforms, which may
              result in security vulnerabilities, data loss, damage,
              destructions, disclosure, or other compromises.
            </p>

            <h3>Limitation of Liability</h3>

            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL COMPANY
              (OR OUR SUPPLIERS) BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY
              LOST PROFITS, LOST DATA, COSTS OF PROCUREMENT OF SUBSTITUTE
              PRODUCTS, OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL,
              SPECIAL OR PUNITIVE DAMAGES ARISING FROM OR RELATING TO THESE
              TERMS OR YOUR USE OF, OR INABILITY TO USE, THE SITE, EVEN IF
              COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              ACCESS TO, AND USE OF, THE SITE IS AT YOUR OWN DISCRETION AND
              RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR
              DEVICE OR COMPUTER SYSTEM, OR LOSS OF DATA RESULTING THEREFROM.{" "}
            </p>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, NOTWITHSTANDING ANYTHING
              TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY
              DAMAGES ARISING FROM OR RELATED TO THIS AGREEMENT (FOR ANY CAUSE
              WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION), WILL AT ALL
              TIMES BE LIMITED TO A MAXIMUM OF FIFTY US DOLLARS (U.S. $50). THE
              EXISTENCE OF MORE THAN ONE CLAIM WILL NOT ENLARGE THIS LIMIT. YOU
              AGREE THAT OUR SUPPLIERS WILL HAVE NO LIABILITY OF ANY KIND
              ARISING FROM OR RELATING TO THIS AGREEMENT.
            </p>
            <p>
              SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF
              LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE
              LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
            </p>

            <h3>Cryptographic Systems</h3>

            <p>
              By utilizing the Site, you represent that you understand the
              inherent risks associated with cryptographic systems; and warrant
              that you have an understanding of the usage and intricacies of
              public/private key cryptography, native cryptographic tokens, like
              Ether (ETH) and Bitcoin (BTC), smart contract based tokens such as
              those that follow the Ethereum Token Standard (
              <a href="https://github.com/ethereum/EIPs/issues/20">
                https://github.com/ethereum/EIPs/issues/20
              </a>
              ), and blockchain-based software systems.
            </p>

            <h3>Platform Security</h3>

            <p>
              We are an early stage platform. You acknowledge that applications
              are code, subject to flaws and acknowledge that you are solely
              responsible for evaluating any available code provided by the
              Services. You further expressly acknowledge and represent that
              applications can be written maliciously or negligently, that we
              cannot be held liable for your interaction with third party
              applications for interaction with Kauri or otherwise. These
              warnings and others later provided by us in no way evidence or
              represent an ongoing duty to alert you to all of the potential
              risks of utilizing the Site and Service.
            </p>

            <h3>Copyright Infringement</h3>

            <p>
              If you believe that your copyright or the copyright of a person on
              whose behalf you are authorized to act has been infringed, please
              provide Company a written notice containing the following
              information: (a) an electronic or physical signature of the person
              authorized to act on behalf of the owner of the copyright or other
              intellectual property interest, (b) a description of the
              copyrighted work or other intellectual property that you claim has
              been infringed, and (c) a description of where the material that
              you claim is infringing is located on the Site.
              <p>
                <br />
                <span>Company can be reached at:</span>
                <br />
                <span>
                  Email:{" "}
                  <a href="mailto:notices@consensys.net">
                    notices@consensys.net
                  </a>
                </span>
                <br />
                <span>Subject Line: Copyright Notification</span>
              </p>
            </p>
            <h3>Term and Termination</h3>

            <p>
              Subject to this Section, these Terms will remain in full force and
              effect while you use the Site. We may suspend or terminate your
              rights to use or access the Site (including your Account) at any
              time for any reason at our sole discretion, including for any use
              of the Site in violation of these Terms. Upon termination of your
              rights under these Terms, your Account and right to access and use
              the Site will terminate immediately. You understand that any
              termination of your Account may involve deletion of your User
              Content associated with your Account from our live databases. Your
              User Content may persist on IPFS. Company will not have any
              liability whatsoever to you for any termination of your rights
              under these Terms, including for termination of your Account or
              deletion of your User Content. Even after your rights under these
              Terms are terminated, the following provisions of these Terms will
              remain in effect: Sections ‎2.2 through ‎2.5, Sections ‎3 through
              8, and Sections 11 through 13.{" "}
            </p>

            <h3>General</h3>

            <ul>
              <li>
                <b>Changes. </b>
                <span>
                  These Terms are subject to occasional revision, and if we make
                  any substantial changes, we will change the Last Updated date
                  above. Continued use of our Site following such notice of such
                  changes shall indicate your acknowledgement of such changes
                  and agreement to be bound by the terms and conditions of such
                  changes.
                </span>
              </li>
              <li>
                <b>
                  Dispute Resolution. Please read this Arbitration Agreement
                  carefully. It is part of your contract with Company and
                  affects your rights. It contains procedures for MANDATORY
                  BINDING ARBITRATION AND A CLASS ACTION WAIVER.{" "}
                </b>
                <ol>
                  <li>
                    <b>(a) </b>
                    <span>
                      Applicability of Arbitration Agreement. All claims and
                      disputes (excluding claims for injunctive or other
                      equitable relief as set forth below) in connection with
                      the Terms or the use of any product or service provided by
                      the Company that cannot be resolved informally or in small
                      claims court shall be resolved by binding arbitration on
                      an individual basis under the terms of this Arbitration
                      Agreement. Unless otherwise agreed to, all arbitration
                      proceedings shall be held in English. This Arbitration
                      Agreement applies to you and the Company, and to any
                      subsidiaries, affiliates, agents, employees, predecessors
                      in interest, successors, and assigns, as well as all
                      authorized or unauthorized users or beneficiaries of
                      services or goods provided under the Terms.
                    </span>
                  </li>
                  <li>
                    <b>(b) </b>
                    <span>
                      Notice Requirement and Informal Dispute Resolution. Before
                      either party may seek arbitration, the party must first
                      send to the other party a written Notice of Dispute
                      (“Notice”) describing the nature and basis of the claim or
                      dispute, and the requested relief. A Notice to the Company
                      should be sent to: 49 Bogart St. #22, Brooklyn, New York
                      11206. After the Notice is received, you and the Company
                      may attempt to resolve the claim or dispute informally. If
                      you and the Company do not resolve the claim or dispute
                      within thirty (30) days after the Notice is received,
                      either party may begin an arbitration proceeding. The
                      amount of any settlement offer made by any party may not
                      be disclosed to the arbitrator until after the arbitrator
                      has determined the amount of the award, if any, to which
                      either party is entitled.
                    </span>
                  </li>

                  <li>
                    <b>(c) </b>

                    <span>
                      Arbitration Rules. Arbitration shall be initiated through
                      the American Arbitration Association (“AAA”), an
                      established alternative dispute resolution provider (“ADR
                      Provider”) that offers arbitration as set forth in this
                      section. If AAA is not available to arbitrate, the parties
                      shall agree to select an alternative ADR Provider. The
                      rules of the ADR Provider shall govern all aspects of the
                      arbitration, including but not limited to the method of
                      initiating and/or demanding arbitration, except to the
                      extent such rules are in conflict with the Terms. The AAA
                      Consumer Arbitration Rules (“Arbitration Rules”) governing
                      the arbitration are available online at www.adr.org or by
                      calling the AAA at 1-800-778-7879. The arbitration shall
                      be conducted by a single, neutral arbitrator. Any claims
                      or disputes where the total amount of the award sought is
                      less than Ten Thousand U.S. Dollars (US $10,000.00) may be
                      resolved through binding non-appearance-based arbitration,
                      at the option of the party seeking relief. For claims or
                      disputes where the total amount of the award sought is Ten
                      Thousand U.S. Dollars (US $10,000.00) or more, the right
                      to a hearing will be determined by the Arbitration Rules.
                      Any judgment on the award rendered by the arbitrator may
                      be entered in any court of competent jurisdiction. If the
                      arbitrator grants you an award that is greater than the
                      last settlement offer that the Company made to you prior
                      to the initiation of arbitration, the Company will pay you
                      the greater of the award or $2,500.00. Each party shall
                      bear its own costs (including attorney’s fees) and
                      disbursements arising out of the arbitration and shall pay
                      an equal share of the fees and costs of the ADR Provider.
                    </span>
                  </li>

                  <li>
                    <b>(d) </b>
                    <span>
                      Additional Rules for Non-Appearance Based Arbitration. If
                      non-appearance based arbitration is elected, the
                      arbitration shall be conducted by telephone, online and/or
                      based solely on written submissions; the specific manner
                      shall be chosen by the party initiating the arbitration.
                      The arbitration shall not involve any personal appearance
                      by the parties or witnesses unless otherwise agreed by the
                      parties.
                    </span>
                  </li>

                  <li>
                    <b>(e) </b>
                    <span>
                      Time Limits. If you or the Company pursue arbitration, the
                      arbitration action must be initiated and/or demanded
                      within the statute of limitations (i.e., the legal
                      deadline for filing a claim) and within any deadline
                      imposed under the AAA Rules for the pertinent claim.
                    </span>
                  </li>

                  <li>
                    <b>(f) </b>
                    <span>
                      Authority of Arbitrator. If arbitration is initiated, the
                      arbitrator will decide the rights and liabilities, if any,
                      of you and the Company, and the dispute will not be
                      consolidated with any other matters or joined with any
                      other cases or parties. The arbitrator shall have the
                      authority to grant motions dispositive of all or part of
                      any claim. The arbitrator shall have the authority to
                      award monetary damages, and to grant any non-monetary
                      remedy or relief available to an individual under
                      applicable law, the AAA Rules, and the Terms. The
                      arbitrator shall issue a written award and statement of
                      decision describing the essential findings and conclusions
                      on which the award is based, including the calculation of
                      any damages awarded. The arbitrator has the same authority
                      to award relief on an individual basis that a judge in a
                      court of law would have. The award of the arbitrator is
                      final and binding upon you and the Company.
                    </span>
                  </li>

                  <li>
                    <b>(g) </b>
                    <span>
                      Waiver of Jury Trial. THE PARTIES HEREBY WAIVE THEIR
                      CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND
                      HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY, instead
                      electing that all claims and disputes shall be resolved by
                      arbitration under this Arbitration Agreement. Arbitration
                      procedures are typically more limited, more efficient and
                      less costly than rules applicable in a court and are
                      subject to very limited review by a court. In the event
                      any litigation should arise between you and the Company in
                      any state or federal court in a suit to vacate or enforce
                      an arbitration award or otherwise, YOU AND THE COMPANY
                      WAIVE ALL RIGHTS TO A JURY TRIAL, instead electing that
                      the dispute be resolved by a judge.
                    </span>
                  </li>

                  <li>
                    <b>(h) </b>
                    <span>
                      Waiver of Class or Consolidated Actions. ALL CLAIMS AND
                      DISPUTES WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT
                      MUST BE ARBITRATED OR LITIGATED ON AN INDIVIDUAL BASIS AND
                      NOT ON A CLASS BASIS, AND CLAIMS OF MORE THAN ONE CUSTOMER
                      OR USER CANNOT BE ARBITRATED OR LITIGATED JOINTLY OR
                      CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR USER.{" "}
                    </span>
                  </li>

                  <li>
                    <b>(i) </b>
                    <span>
                      Confidentiality. All aspects of the arbitration
                      proceeding, including but not limited to the award of the
                      arbitrator and compliance therewith, shall be strictly
                      confidential. The parties agree to maintain
                      confidentiality unless otherwise required by law. This
                      paragraph shall not prevent a party from submitting to a
                      court of law any information necessary to enforce this
                      Agreement, to enforce an arbitration award, or to seek
                      injunctive or equitable relief.
                    </span>
                  </li>

                  <li>
                    <b>(j) </b>
                    <span>
                      Severability. If any part or parts of this Arbitration
                      Agreement are found under the law to be invalid or
                      unenforceable by a court of competent jurisdiction, then
                      such specific part or parts shall be of no force and
                      effect and shall be severed and the remainder of the
                      Agreement shall continue in full force and effect.
                    </span>
                  </li>

                  <li>
                    <b>(k) </b>
                    <span>
                      Right to Waive. Any or all of the rights and limitations
                      set forth in this Arbitration Agreement may be waived by
                      the party against whom the claim is asserted. Such waiver
                      shall not waive or affect any other portion of this
                      Arbitration Agreement.
                    </span>
                  </li>

                  <li>
                    <b>(l) </b>
                    <span>
                      Survival of Agreement. This Arbitration Agreement will
                      survive the termination of your relationship with Company.
                    </span>
                  </li>

                  <li>
                    <b>(m) </b>
                    <span>
                      Small Claims Court. Notwithstanding the foregoing, either
                      you or the Company may bring an individual action in small
                      claims court.
                    </span>
                  </li>

                  <li>
                    <b>(n) </b>
                    <span>
                      Emergency Equitable Relief. Notwithstanding the foregoing,
                      either party may seek emergency equitable relief before a
                      state or federal court in order to maintain the status quo
                      pending arbitration. A request for interim measures shall
                      not be deemed a waiver of any other rights or obligations
                      under this Arbitration Agreement.
                    </span>
                  </li>

                  <li>
                    <b>(o) </b>
                    <span>
                      Claims Not Subject to Arbitration. Notwithstanding the
                      foregoing, claims of defamation, violation of the Computer
                      Fraud and Abuse Act, and infringement or misappropriation
                      of the other party’s patent, copyright, trademark or trade
                      secrets shall not be subject to this Arbitration
                      Agreement.
                    </span>
                  </li>

                  <li>
                    <b>(p) </b>
                    <span>
                      Courts. In any circumstances where the foregoing
                      Arbitration Agreement permits the parties to litigate in
                      court, the parties hereby agree to submit to the personal
                      jurisdiction of the courts located within Kings County,
                      New York, for such purpose.
                    </span>
                  </li>
                </ol>
              </li>

              <br />

              <li>
                <b>Export. </b>
                <span>
                  The Site may be subject to U.S. export control laws and may be
                  subject to export or import regulations in other countries.
                  You agree not to export, re-export, or transfer, directly or
                  indirectly, any U.S. technical data acquired from Company, or
                  any products utilizing such data, in violation of the United
                  States export laws or regulations.
                </span>
              </li>

              <br />
              <li>
                <b>Electronic Communications. </b>
                <span>
                  The communications between you and Company use electronic
                  means, whether you use the Site or send us emails, or whether
                  Company posts notices on the Site or communicates with you via
                  email. For contractual purposes, you (a) consent to receive
                  communications from Company in an electronic form; and (b)
                  agree that all terms and conditions, agreements, notices,
                  disclosures, and other communications that Company provides to
                  you electronically satisfy any legal requirement that such
                  communications would satisfy if it were be in a hard-copy
                  writing. The foregoing does not affect your non-waivable
                  rights.
                </span>
              </li>

              <br />
              <li>
                <b>Entire Terms. </b>
                <span>
                  These Terms constitute the entire agreement between you and us
                  regarding the use of the Site. Our failure to exercise or
                  enforce any right or provision of these Terms shall not
                  operate as a waiver of such right or provision. The section
                  titles in these Terms are for convenience only and have no
                  legal or contractual effect. The word “including” means
                  “including without limitation”. If any provision of these
                  Terms is, for any reason, held to be invalid or unenforceable,
                  the other provisions of these Terms will be unimpaired and the
                  invalid or unenforceable provision will be deemed modified so
                  that it is valid and enforceable to the maximum extent
                  permitted by law. Your relationship to Company is that of an
                  independent contractor, and neither party is an agent or
                  partner of the other. These Terms, and your rights and
                  obligations herein, may not be assigned, subcontracted,
                  delegated, or otherwise transferred by you without Company’s
                  prior written consent, and any attempted assignment,
                  subcontract, delegation, or transfer in violation of the
                  foregoing will be null and void. Company may freely assign
                  these Terms. The terms and conditions set forth in these Terms
                  shall be binding upon assignees.
                </span>
              </li>

              <br />
              <li>
                <b>Contact. </b>
                <span>
                  We welcome your comments or questions about these Terms.
                  Please contact us at:{" "}
                  <a href="mailto:info@kauri.io">info@kauri.io</a>.
                </span>
              </li>
            </ul>
          </PrivacyPolicyText>
        </Content>
      </section>
    );
  }
}

export default TermsOfUse;
