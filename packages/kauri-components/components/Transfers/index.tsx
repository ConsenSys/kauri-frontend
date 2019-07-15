import Container from "./Container";
import Table from "./Table";
import { H3, BodyCard } from "../Typography";

interface IProps {
  data: ITransfer[];
  rejectArticleTransferAction: ({ id }: { id: string }) => void;
  acceptArticleTransferAction: ({ id }: { id: string }) => void;
}

export interface ITransfer {
  id: string;
  transferrer: {
    username: string;
    id: string;
  };
  article: {
    id: string;
    title: string;
    owner: {
      name: string;
      username: string;
      id: string;
    };
  };
}

const Transfers = (props: IProps) => (
  <Container>
    <H3>Ownership Transfers Requests</H3>
    <BodyCard>
      Pending transfer requests appear here. By accepting, you will gain full
      control over the content of the transferred article. Rejecting will remove
      it from the queue.
    </BodyCard>
    <Table
      acceptArticleTransferAction={props.acceptArticleTransferAction}
      rejectArticleTransferAction={props.rejectArticleTransferAction}
      data={props.data}
    />
  </Container>
);

export default Transfers;
