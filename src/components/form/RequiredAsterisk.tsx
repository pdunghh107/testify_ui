import styled from "styled-components";

const StyledAsterisk = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  margin-left: 4px;
`;

export function RequiredAsterisk() {
  return <StyledAsterisk>*</StyledAsterisk>;
}
