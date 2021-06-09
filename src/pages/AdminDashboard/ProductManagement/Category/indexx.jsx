import { changeAdminNavbarTitle } from "app/redux/commonSlice";
import { fetchListMovieType } from "app/redux/movieTypeSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieTypeTable from "./Category.table";
import MovieTypeFormModal from "./Category.formDialog";

export default function MovieTypeManagement() {
  const dispatch = useDispatch();
  const listMovieType = useSelector((state) => state.movieType.listMovieType);

  useEffect(() => {
    dispatch(changeAdminNavbarTitle("Quản lý thể loại phim"));
    dispatch(fetchListMovieType({}));
  }, [dispatch]);

  return (
    <div>
      <MovieTypeFormModal />
      <div className="pt-20">
        <MovieTypeTable listMovieType={listMovieType} />
      </div>
    </div>
  );
}
