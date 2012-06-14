-- Load records from the title-and-actor.txt file (tab separated).
file1 = load '../data/director-and-title.txt' as (director: chararray, title: chararray, year: int);
-- Load records from the title-and-actor.txt file (tab separated).
file2 = load '../data/title-and-actor.txt' as (title: chararray, actor: chararray, year_of_birth: int,role: chararray);

-- Cogroup file1 and file2
cogrouped = cogroup file1 by title, file2 by title;

-- Output the result.
store cogrouped into '../results/director-title-actor_cogroup';

