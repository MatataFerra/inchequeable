import { FC } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

interface Props {
  id: string | number;
}

export const FacebookButton: FC<Props> = ({ id }) => {
  return (
    <>
      <FacebookShareButton
        url={`https://www.inchequeable.com.ar/article/${id}`}
        quote="Encontré esta nota en Inchequeable.com.ar"
        about="Inchequeable.com.ar"
        hashtag="#EstoEsInchequeable"
      >
        <FacebookIcon size={32} />
      </FacebookShareButton>
    </>
  );
};

export const WhatsappButton: FC<Props> = ({ id }) => {
  return (
    <>
      <WhatsappShareButton
        url={`https://www.inchequeable.com.ar/article/${id}`}
        title="Encontré esta nota en Inchequeable.com.ar"
        about="Inchequeable.com.ar"
      >
        <WhatsappIcon size={32} />
      </WhatsappShareButton>
    </>
  );
};

export const LinkedinButton: FC<Props> = ({ id }) => {
  return (
    <>
      <LinkedinShareButton
        url={`https://www.inchequeable.com.ar/article/${id}`}
        about="Inchequeable.com.ar"
        title="Encontré esta nota en Inchequeable.com.ar"
      >
        <LinkedinIcon size={32} />
      </LinkedinShareButton>
    </>
  );
};

export const TwitterButton: FC<Props> = ({ id }) => {
  return (
    <>
      <TwitterShareButton
        url={`https://www.inchequeable.com.ar/article/${id}`}
        about="Inchequeable.com.ar"
        title="Encontré esta nota en Inchequeable.com.ar"
      >
        <TwitterIcon size={32} />
      </TwitterShareButton>
    </>
  );
};
