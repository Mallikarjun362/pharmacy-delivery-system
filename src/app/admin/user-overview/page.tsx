import { format } from 'date-fns';
import { getAllUserOverview } from '../_functionality/ServerActions';
import Link from 'next/link';

export default async function UserOverviewPage() {
  const userList = await getAllUserOverview();
  return (
    <main className="mainPage">
      <div className="tableWrapper">
        <table className="standardTable">
          <thead>
            <th>Email</th>
            <th>User type</th>
            <th>Joined at</th>
          </thead>
          <tbody>
            {userList.map((ele, idx) => (
              <tr key={idx}>
                <td>
                  <Link href={`/account/admin?userEmail=${ele.primary_email}`} className='hover:text-blue-500'>
                    {ele.primary_email}
                  </Link>
                </td>
                <td>{ele.user_type}</td>
                <td>{format(ele.joined_at, 'd MMM / yyyy')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
