// Polyfill TextEncoder/TextDecoder for Node (Jest)
import { TextEncoder, TextDecoder } from "util";

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Mock Remix navigation
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => jest.fn(),
  useParams: () => ({ id: "123" }),
}));

// Mock URL.createObjectURL for blob previews
(global as any).URL.createObjectURL = jest.fn();
