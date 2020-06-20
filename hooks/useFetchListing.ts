import { useState, useEffect } from 'react';
import { RedditListingResponse, RedditSubreddit, RedditPost } from 'types';

const initialListingResponse = {
  listing: { kind: null, data: null },
  count: 0,
};

type ListingChild = RedditSubreddit | RedditPost;

// TODO: Get this to just return the array of T, all other fields can be managed in this hook.
type ListingDataState<T extends ListingChild> = {
  listing: RedditListingResponse<T>;
  count?: number;
};

type UseFetchListing<T extends ListingChild> = {
  listingState: ListingDataState<T>;
  getNext: () => void;
};

// TODO: This currently fetches twice - assume due to changing accessToken being handled badly.
// Implementing useAccessToken should fix.
function useFetchListing<T extends ListingChild>(
  accessToken: string | null,
  listingUrl: string,
): UseFetchListing<T> {
  const [listingDataState, setListingDataState] = useState<ListingDataState<T>>(
    initialListingResponse,
  );
  const [shouldFetch, setShouldFetch] = useState(true);

  const getNext = () => setShouldFetch(true);

  useEffect(() => {
    const fetchListingAndUpdateState = async () => {
      if (!accessToken || !shouldFetch) {
        return;
      }

      const fetchListing = async (): Promise<RedditListingResponse<T>> => {
        const res = await fetch(listingUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // TODO: These responses aren't super pleasant to work with. Make adapter.
        return await res.json();
      };

      const listing = await fetchListing();

      setListingDataState((currentListingDataState) => ({
        listing,
        count:
          currentListingDataState?.count ??
          0 + (listing.data?.children.length ?? 0),
      }));

      setShouldFetch(false);
    };

    fetchListingAndUpdateState();
  }, [accessToken, listingUrl, shouldFetch]);

  return { listingState: listingDataState, getNext };
}

export { useFetchListing };
