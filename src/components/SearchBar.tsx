import { Badge, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch, BsXCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useMediaQueryStore } from "../store";

const SearchBar = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { query } = useMediaQueryStore();
  const search = useMediaQueryStore((s) => s.search);
  const navigate = useNavigate();

  return (
    <form
      data-testid="search-form"
      style={{ width: "100%" }}
      onSubmit={(event) => {
        if (ref.current) {
          search(ref.current.value);
          ref.current.value = "";
          navigate("/");
        }
        event.preventDefault();
      }}
    >
      <InputGroup>
        <InputLeftElement>
          <BsSearch />
        </InputLeftElement>
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search media"
          variant={"filled"}
        />
      </InputGroup>
      {query.searchText && (
        <Badge
          role="status"
          colorScheme="blue"
          mt={2}
          marginLeft={1}
          borderRadius={5}
          position={"absolute"}
          paddingX={2}
          paddingY={1}
          display={"flex"}
          alignItems={"center"}
        >
          {query.searchText}
          <BsXCircleFill
            title="Close"
            onClick={() => {
              search("");
            }}
            cursor={"pointer"}
            style={{ marginLeft: "8px" }}
          />
        </Badge>
      )}
    </form>
  );
};

export default SearchBar;
