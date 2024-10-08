import { Flex } from 'antd'
import StatRow from 'components/characterPreview/StatRow.tsx'
import { Constants } from 'lib/constants.ts'

export const CharacterStatSummary = (props: {
  finalStats: any
  elementalDmgValue: string
  cv?: number
  simScore?: number
}) => {
  return (
    <Flex vertical style={{ paddingLeft: 6, paddingRight: 8 }} gap={3}>
      <StatRow finalStats={props.finalStats} stat={Constants.Stats.HP} />
      <StatRow finalStats={props.finalStats} stat={Constants.Stats.ATK} />
      <StatRow finalStats={props.finalStats} stat={Constants.Stats.DEF} />
      <StatRow finalStats={props.finalStats} stat={Constants.Stats.SPD} />
      <StatRow finalStats={props.finalStats} stat={Constants.Stats.CR} />
      <StatRow finalStats={props.finalStats} stat={Constants.Stats.CD} />
      <StatRow finalStats={props.finalStats} stat={Constants.Stats.EHR} />
      <StatRow finalStats={props.finalStats} stat={Constants.Stats.RES} />
      <StatRow finalStats={props.finalStats} stat={Constants.Stats.BE} />
      {!props.simScore && <StatRow finalStats={props.finalStats} stat={Constants.Stats.OHB} />}
      <StatRow finalStats={props.finalStats} stat={Constants.Stats.ERR} />
      <StatRow finalStats={props.finalStats} stat={props.elementalDmgValue} />
      {props.simScore != null && <StatRow finalStats={props.finalStats} stat="simScore" value={props.simScore} />}
    </Flex>
  )
}
