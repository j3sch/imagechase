import Row from 'react-bootstrap/Row'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Badge from 'react-bootstrap/Badge'
import Link from 'next/link'

export default function JudgesList({ compJudges }) {
  return (
    <Row className={'pt-3 px-3 text-center text-lg-start'}>
      {compJudges &&
        compJudges.Judge.map((judge) => (
          <OverlayTrigger
            key={judge}
            placement="bottom"
            overlay={
              <Popover id={judge.User.id}>
                <Popover.Header as="h3">{judge.User.name}</Popover.Header>
                <Popover.Body>{judge.User.bio}</Popover.Body>
              </Popover>
            }
          >
            <Badge
              bg="light"
              className={
                'text-text-light-blue rounded-circle d-flex justify-content-center align-items-center me-2'
              }
              style={{ height: '2.8rem', width: '2.8rem' }}
            >
              <Link
                href="/user/[i]/profile"
                as={`/user/${judge ? judge.User.id : ''}/profile`}
                passHref
              >
                <div>
                  <span
                    style={{ fontSize: '1.6rem' }}
                    className={'fw-bold text-uppercase'}
                  >
                    {judge.User.name.slice(0, 1)}
                  </span>
                </div>
              </Link>
            </Badge>
          </OverlayTrigger>
        ))}
    </Row>
  )
}
