-- Load records from the title-and-actor.txt file (tab separated).
file = load '../data/director-and-title.txt' as (director: chararray, title: chararray, year: int);
-- Group the lines by title.
file_grouped_by_director = group file by director;
-- Output the result.
store file_grouped_by_director into '../results/director-and-title_group-on-director';

