import styled from "styled-components";

const StyledAsterisk = styled.span`
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.danger};
`;

export function RequiredAsterisk() {
  return <StyledAsterisk>*</StyledAsterisk>;
}
