import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Loader from '../Loader/Loader';

import { getSolutions } from '../../store/actions/solutionActions';
import './styles.css';
import Solution from '../Solutions/Solution';
import { Button } from '@nextui-org/react';

const Shortlisted = ({ getSolutions, solution: { solutions, isLoading, error }, auth: { me }, orgSolution }) => {
  useEffect(() => {
    getSolutions();
  }, []);
  solutions = solutions.filter(e => e.message === orgSolution && e.shortlisted);
  const [itemoffset, setItemoffset] = useState(0);
  const selectedSolutions = solutions.filter(e => e.selected);
  const [selected, setSelected] = useState(selectedSolutions);
  const itemsperpage = 6;
  const endooffset = itemoffset + itemsperpage;
  let currentItems = solutions.slice(itemoffset, endooffset)
  const pageCount = solutions.length / itemsperpage;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % solutions.length
    setItemoffset(newOffset)
  }
  return (
    <div className="message-list">
      {error && <div className="error-center">{error}</div>}
      <div className="list">
        {isLoading ? (
          <Loader />
        ) : (
          <>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {selected && selected.length==0 && <Button color='success' > Declare Winners </Button>}
          </div>
            {currentItems.map((solution, index) => <Solution key={index} solution={solution} shortlist={true} selected={selected} setSelected={setSelected}/>)}
            {
              solutions.length >= 6 && (
                <ReactPaginate
                  className='paginate'
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  activeLinkClassName='activeLink'
                />
              )
            }
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  solution: state.solution,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSolutions })(Shortlisted);
