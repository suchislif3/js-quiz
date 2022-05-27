import "styled-components";
import { ThemeInterface } from "../src/common/interfaces";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeInterface {}
}
