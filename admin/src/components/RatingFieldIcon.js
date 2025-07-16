import { Flex } from "@strapi/design-system/Flex";
import { Icon } from "@strapi/design-system/Icon";
import Star from "@strapi/icons/Star";
import React from "react";
import styled from "styled-components";

const StyledFlex = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.warning100};
  border: 1px solid ${({ theme }) => theme.colors.warning200};

  svg > path {
    fill: ${({ theme }) => theme.colors.warning500};
  }
`;

const PluginIcon = () => (
  <StyledFlex
    justifyContent="center"
    alignItems="center"
    width={7}
    height={6}
    hasRadius
    aria-hidden
  >
    <Icon as={Star} />
  </StyledFlex>
);

export default PluginIcon;
