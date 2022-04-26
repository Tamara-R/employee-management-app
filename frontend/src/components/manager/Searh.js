import React, { useState } from 'react';

const Search = ({ history }) => {

    const [ keyword, setKeyword ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/home');
        }
    }

  return (

    <div className='ui center aligned container'>
        <form onSubmit={handleSubmit} className="ui form">
            <div className='ui icon input mr-2'>
                <i className="search icon"></i>
                <input
                    type="text"
                    placeholder="Search By Title"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
            </div>
            <button className="ui button" type="submit" >Search</button>      
        </form>
    </div>
  )
}

export default Search;