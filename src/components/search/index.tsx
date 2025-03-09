'use client';

import { FaSearch } from "react-icons/fa";
import styles from './styles.module.scss'
import { useState } from "react";
import { InputParamter } from "@/assets/types";
import Button from "../button";
import useBoolean from "@/hooks/useBoolean";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../../request/seacrh";

const Search = () => {
  const [value, setValue] = useState<string>('');
  const { state: isOpen, setToggle } = useBoolean(!!value);
  const { data } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies
  });

  console.log(data, 1231);

  const onChange = (event: InputParamter) => {
    setValue(event.target.value);
  }

  return (
    <div className={styles.container}>
      {isOpen && <input value={value} onChange={onChange} placeholder="Որոնել" />}
      <Button onClick={setToggle}>
        <FaSearch className={styles.search} />
      </Button>
    </div>
  )
};

export default Search;
